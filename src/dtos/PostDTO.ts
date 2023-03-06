import Joi from 'joi';
import { PostModelType } from '../models/PostModel';

type PostDTOType = {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
};

export default class PostDTO {
  title: string;

  content: string;

  author: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(data: PostDTOType) {
    const schema = Joi.object({
      title: Joi.string().min(6).required(),
      content: Joi.string().min(6).required(),
      author: Joi.string().required(),
    });

    const validation = schema.validate(data);
    if (validation.error) throw validation.error;

    this.title = data.title;
    this.content = data.content;
    this.author = data.author;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Return structure of Post model
   * @returns PostModelType
   */
  toPost(): PostModelType {
    return {
      title: this.title,
      content: this.content,
      author: this.author,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}