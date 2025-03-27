import { Schema, model, Document } from 'mongoose';

// 1. Interfaccia TypeScript (cosa SALVIAMO nel DB)
interface IPost extends Document {
  title: string;
  content: string;
  slug: string; // URL unico (es: "come-creare-un-blog")
  author: string; // ID dell'autore
  isPublished: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// 2. Schema Mongoose (con validazioni)
const PostSchema = new Schema<IPost>(
  {
    title: { 
      type: String, 
      required: [true, 'Il titolo è obbligatorio'], 
      minlength: 5
    },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, ref: 'User', required: true },
    isPublished: { type: Boolean, default: false },
    tags: [{ type: String }]
  },
  { timestamps: true } // Auto-aggiunge createdAt/updatedAt
);

// 3. Metodi personalizzati
PostSchema.methods.publish = function() {
  this.isPublished = true;
  return this.save();
};

// 4. Creazione finale del modello
export const Post = model<IPost>('Post', PostSchema);