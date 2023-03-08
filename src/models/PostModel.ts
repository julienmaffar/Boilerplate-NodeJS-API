import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

export type PostModelType = {
  title: string;
  content: string;
  author: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  comments?: [{ _id: ObjectId; title: string; content: string }];
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
    picture: {
      type: String,
      required: true,
    },
    comments: [
      {
        title: String,
        content: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Post = model<PostModelType>('Post', postSchema);
