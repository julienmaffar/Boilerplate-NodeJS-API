import { ObjectId } from 'mongodb';
import { FieldValidationError } from '../errors/app.errors';

export const getValidObjectId = (id: string | ObjectId): ObjectId => {
  if (!ObjectId.isValid(id))
    throw new FieldValidationError(`${id}`, 'is not ObjectId');
  if (typeof id === 'string') return new ObjectId(id);
  return id;
};
