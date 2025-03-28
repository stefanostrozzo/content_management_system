import { Document } from 'mongoose';

// 1. Interfaccia principale per il Post
export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Interfaccia per la creazione di un nuovo post (senza campi automatici)
export interface IPostCreate {
  title: string;
  content: string;
  author: string;
}

// 3. Interfaccia per l'aggiornamento di un post (tutti i campi opzionali)
export interface IPostUpdate {
  title?: string;
  content?: string;
}

export interface IPostResponse {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string; // Date come ISO string
  updatedAt: string;
}