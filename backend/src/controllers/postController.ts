import { Request, Response } from "express";
import { Post } from "../models/Post.model";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, slug, author, tags } = req.body;
    
    const newPost = new Post({ 
      title, 
      content, 
      slug, 
      author, 
      tags
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json();
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    
    const newPost = new Post({
        title: "Titolo di prova2", 
        content: "Contenuto di esempio...",
        slug: "titolo-di-prova",
        author: "1234567890", 
        tags: ["test", "mongodb"]
    });

    //await newPost.save();
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json();
  }
};
