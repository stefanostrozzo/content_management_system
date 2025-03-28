import { Request, Response } from 'express';
import { Post } from '../models/Post.model';
import logger from '../utils/logger';
import { IPostCreate } from '@interfaces/IPost';
import { IPostResponse } from '@interfaces/IPost';
import { IPostUpdate } from '@interfaces/IPost';
import mongoose from 'mongoose';

export const createPost = async (req: Request<{}, {}, IPostCreate>, res: Response) => {
    try {
      const { title, content, author } = req.body;
      
      if (!title?.trim() || !content?.trim() || !author?.trim()) {
        return res.status(400).json({
          error: "Dati mancanti",
          required: ["title (min 3 chars)", "content (min 10 chars)", "author"]
        });
      }
  
      const newPost = await Post.create({ 
        title: title.trim(),
        content: content.trim(),
        author: author.trim() 
      });
  
      res.status(201).json(newPost);
    } catch (error) {
      if (error instanceof Error) {
        logger.error("Errore creazione post:", {
          error: error.message,
          body: req.body,
          stack: error.stack
        });
        
        if (error.name === 'ValidationError') {
          return res.status(400).json({ 
            error: "Validazione fallita", 
            details: error.message 
          });
        }
      }
      
      res.status(500).json({ 
        error: "Errore interno del server",
        ...(process.env.NODE_ENV === 'development' && {
          debug: error instanceof Error ? error.message : JSON.stringify(error)
        })
      });
    }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Errore nel leggere i post" });
  }
};

//Interface to get post by id
interface IGetPostRequest extends Request {
    params: {
      id: string;
    };
  }

export const getPostById = async (req: IGetPostRequest, res: Response) => {
    const { id } = req.params;
    
    // 1. VALIDAZIONE ID - Perché è fondamentale:
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            error: "ID non valido",
            details: {
                motivo: "L'ID deve essere un ObjectId MongoDB valido",
                formato_corretto: "24 caratteri esadecimali (es. 507f1f77bcf86cd799439011)",
                id_ricevuto: id
            }
        });
    }

    try {
        // 2. RICERCA NEL DB - Metodo Mongoose cruciale
        const post = await Post.findById(id);

        // 3. GESTIONE POST NON TROVATO - Per UX migliore
        if (!post) {
            return res.status(404).json({ 
                error: "Post non trovato",
                soluzioni: [
                    "Verifica di aver inserito l'ID corretto",
                    "Controlla se il post è stato eliminato"
                ],
                id_richiesto: id
            });
        }

        // 4. RISPOSTA FORMATTATA - Per consistenza API
        const response: IPostResponse = {
            id: post._id.toString(),
            title: post.title,
            content: post.content,
            author: post.author,
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString()
          };
        res.json({ success: true, data: response });

    } catch (error) {
        // 5. GESTIONE ERRORI - Per debugging e sicurezza
        logger.error(`Errore grave durante la ricerca del post ${id}:`, {
            error,
            request: {
                params: req.params,
                headers: req.headers
            }
        });

        res.status(500).json({
            error: "Errore di sistema",
            codice_errore: "POST_FETCH_500",
            ...(process.env.NODE_ENV === 'development' && {
                stack: error instanceof Error ? error.stack : undefined,
                tipo_errore: error instanceof Error ? error.name : typeof error
            })
        });
    }
};

export const updatePost = async (req: Request<{ id: string }, {}, IPostUpdate>, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;

    // 1. Validazione dell'ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            error: "ID non valido",
            details: {
                motivo: "L'ID deve essere un ObjectId MongoDB valido",
                formato_corretto: "24 caratteri esadecimali (es. 507f1f77bcf86cd799439011)",
                id_ricevuto: id
            }
        });
    }

    // 2. Validazione dei dati in input (almeno un campo da aggiornare)
    if (title === undefined && content === undefined) {
        return res.status(400).json({
            error: "Nessun dato da aggiornare",
            required: "Fornire almeno uno tra 'title' e 'content'",
            received: {
                title: title !== undefined ? "provided" : "missing",
                content: content !== undefined ? "provided" : "missing"
            }
        });
    }

    try {
        // 3. Preparazione dell'oggetto di update
        const updateData: Partial<IPostUpdate> = {};
        if (title !== undefined) updateData.title = title.trim();
        if (content !== undefined) updateData.content = content.trim();

        // 4. Esecuzione dell'update
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            updateData,
            { 
                new: true, 
                runValidators: true 
            }
        );

        // 5. Gestione post non trovato
        if (!updatedPost) {
            return res.status(404).json({ 
                error: "Post non trovato",
                soluzioni: [
                    "Verifica di aver inserito l'ID corretto",
                    "Controlla se il post è stato eliminato"
                ],
                id_richiesto: id
            });
        }

        // 6. Formattazione della risposta usando IPostResponse
        const response: IPostResponse = {
            id: updatedPost._id.toString(),
            title: updatedPost.title,
            content: updatedPost.content,
            author: updatedPost.author,
            createdAt: updatedPost.createdAt.toISOString(),
            updatedAt: updatedPost.updatedAt.toISOString()
        };

        res.json({ 
            success: true,
            message: "Post aggiornato con successo",
            data: response 
        });

    } catch (error) {
        // 7. Gestione degli errori (consistente con gli altri metodi)
        if (error instanceof Error) {
            logger.error(`Errore durante l'aggiornamento del post ${id}:`, {
                error: error.message,
                body: req.body,
                stack: error.stack
            });

            if (error.name === 'ValidationError') {
                return res.status(400).json({ 
                    error: "Validazione fallita", 
                    details: error.message 
                });
            }
        }
        
        res.status(500).json({
            error: "Errore interno del server",
            codice_errore: "POST_UPDATE_500",
            ...(process.env.NODE_ENV === 'development' && {
                debug: error instanceof Error ? error.message : JSON.stringify(error)
            })
        });
    }
};


interface IDeletePostRequest extends Request {
    params: {
      id: string;
    };
  }

export const deletePost = async (req: IDeletePostRequest, res: Response) => {
    const { id } = req.params;
  
    // 1. Validazione ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: "ID non valido",
        details: {
          motivo: "L'ID deve essere un ObjectId MongoDB valido",
          formato_corretto: "24 caratteri esadecimali (es. 507f1f77bcf86cd799439011)",
          id_ricevuto: id
        }
      });
    }
  
    try {
      // 2. Eliminazione diretta con verifica
      const deletedPost = await Post.findOneAndDelete({ _id: id }).lean().exec();
  
      // 3. Gestione post non trovato
      if (!deletedPost) {
        return res.status(404).json({ 
          error: "Post non trovato",
          soluzioni: [
            "Verifica di aver inserito l'ID corretto",
            "Il post potrebbe essere già stato eliminato"
          ],
          id_richiesto: id
        });
      }
  
      // 4. Risposta standardizzata
      const response: IPostResponse = {
        id: deletedPost._id?.toString(),
        title: deletedPost.title,
        content: deletedPost.content,
        author: deletedPost.author,
        createdAt: deletedPost.createdAt.toISOString(),
        updatedAt: deletedPost.updatedAt.toISOString()
      };
  
      res.json({ 
        success: true,
        message: "Post eliminato con successo",
        data: response
      });
  
    } catch (error) {
      // 5. Gestione errori
      logger.error(`Errore durante l'eliminazione del post ${id}:`, {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        request: {
          params: req.params,
          method: req.method
        }
      });
  
      res.status(500).json({
        error: "Errore durante l'eliminazione del post",
        codice_errore: "POST_DELETE_500",
        ...(process.env.NODE_ENV === 'development' && {
          debug: error instanceof Error ? error.message : JSON.stringify(error)
        })
      });
    }
  };