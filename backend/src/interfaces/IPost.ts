import { Document } from 'mongoose';

// 1. Interfaccia principale per il Post
export interface IPost extends Document {
  title: string;
  content: string;
  slug: string;
  author: string; // Riferimento all'ID dell'utente
  isPublished: boolean;
  tags: string[];
  createdAt?: Date; // Opzionale (gestito automaticamente da Mongoose)
  updatedAt?: Date; // Opzionale (gestito automaticamente da Mongoose)
}

// 2. Interfaccia per la creazione di un nuovo post (senza campi automatici)
export interface IPostCreate {
  title: string;
  content: string;
  author: string;
  tags?: string[]; // Opzionale
}

// 3. Interfaccia per l'aggiornamento di un post (tutti i campi opzionali)
export interface IPostUpdate {
  title?: string;
  content?: string;
  isPublished?: boolean;
  tags?: string[];
}