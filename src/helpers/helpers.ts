import { ObjectId } from 'mongodb';
import { FieldValidationError } from '../errors/app.errors';

/**
 * Check if id params is valid ObjectId
 *
 * @param id string | ObjectId
 * @returns ObjectId | new FieldValidationError
 */
export const getValidObjectId = (id: string | ObjectId): ObjectId => {
  if (!ObjectId.isValid(id))
    throw new FieldValidationError(`${id}`, 'is not ObjectId');
  if (typeof id === 'string') return new ObjectId(id);
  return id;
};
