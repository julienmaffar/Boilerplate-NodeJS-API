import Joi from 'joi';
import { FieldValidationError } from '../errors/app.errors';
import { PostModelType } from '../models/PostModel';

type PostDTOType = {
  title: string;
  content: string;
  author: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
};

export default class PostDTO {
  title: string;

  content: string;

  author: string;

  picture: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(data: PostDTOType) {
    const schema = Joi.object({
      title: Joi.string().min(6).required(),
      content: Joi.string().min(6).required(),
      author: Joi.string().required(),
      picture: Joi.string().required(),
    });

    const validation = schema.validate(data);
    if (validation.error)
      throw new FieldValidationError(validation.error.message);

    this.title = data.title;
    this.content = data.content;
    this.author = data.author;
    this.picture = data.picture;
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
      picture: this.picture,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
