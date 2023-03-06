import multer from 'multer';
import { Request as ExpressRequest } from 'express';
import { uuid } from 'uuidv4';
import { UnauthorizedError } from '../errors/app.errors';

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, 'uploads');
  },
  filename: (_, file, callback) => {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    callback(null, `${uuid()}.${extension}`);
  },
});

const fileFilter = (
  _: ExpressRequest,
  file: Express.Multer.File,
  callback: CallableFunction,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
    return callback(
      new UnauthorizedError('Only image files are allowed'),
      false,
    );
  callback(null, true);
};

export const configurationStorage = () => multer({ storage, fileFilter });
