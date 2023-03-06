export type Pagination<T> = {
  data: T[];
  limit: number;
  pageNumber: number;
  next: string;
  previous: string;
};

/**
 * Return object with pagination system
 *
 * @param documents T[]
 * @param limit number
 * @param pageNumber number
 * @param path string
 * @returns {
 *  data: T[]
 *  limit: number
 *  pageNumber: number
 *  next: string
 *  previous: string
 * }
 */
export const paginate = <T>(
  documents: T[],
  limit: number,
  pageNumber: number,
  path: string,
): Pagination<T> => ({
  data: documents,
  limit,
  pageNumber,
  next:
    documents.length < limit
      ? ''
      : `${process.env.HOST}:${process.env.PORT}${path}?page=${pageNumber + 1}`,
  previous:
    pageNumber > 1
      ? `${process.env.HOST}:${process.env.PORT}${path}?page=${pageNumber - 1}`
      : '',
});
