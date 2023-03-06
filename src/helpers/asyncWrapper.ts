import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';

/**
 * Async wrapper to wrapping controller class
 *
 * @param controller CallbableFunction
 * @returns Promise<void>
 */
const asyncWrapper =
  (controller: CallableFunction) =>
  async (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await controller(req, res, next);
    } catch (e) {
      next(e);
    }
  };

export default asyncWrapper;
