import Joi from 'joi';
import { FieldValidationError } from '../errors/app.errors';

export type CommentDTOType = {
  title: string;
  content: string;
};

export default class CommentDTO {
  title: string;

  content: string;

  constructor(data: CommentDTOType) {
    const schema = Joi.object({
      title: Joi.string().min(6).required(),
      content: Joi.string().min(10).required(),
    });

    const validation = schema.validate(data);
    if (validation.error)
      throw new FieldValidationError(validation.error.message);

    this.title = data.title;
    this.content = data.content;
  }

  toComment() {
    return {
      title: this.title,
      content: this.content,
    };
  }
}
