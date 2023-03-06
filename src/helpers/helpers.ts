import { ObjectId } from 'mongodb';

/**
 * Check if id params is valid ObjectId
 *
 * @param id string | ObjectId
 * @returns ObjectId | new Error
 */
export const getValidObjectId = (id: string | ObjectId): ObjectId => {
  if (!ObjectId.isValid(id)) throw new Error(`${id} is not ObjectId`);
  if (typeof id === 'string') return new ObjectId(id);
  return id;
};
