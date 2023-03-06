import { Schema, model } from 'mongoose';

export type PostModelType = {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Mongoose Post Schema
 */
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Post = model<PostModelType>('Post', postSchema);
