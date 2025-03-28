// models/Post.model.ts
import { Schema, model } from 'mongoose';
import { IPost } from '../interfaces/IPost';

const PostSchema = new Schema<IPost>({
  title: { 
    type: String, 
    required: [true, 'Il titolo è obbligatorio'],
    trim: true
  },
  content: { 
    type: String, 
    required: [true, 'Il contenuto è obbligatorio'],
    minlength: 10
  },
  author: { 
    type: String, 
    required: [true, "L'autore è obbligatorio"],
    ref: 'User' // Se hai un modello User
  }
}, { timestamps: true });

export const Post = model<IPost>('Post', PostSchema);