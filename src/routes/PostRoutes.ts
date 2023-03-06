import { Router } from 'express';
import { PostRoutes } from '../contants';
import PostController from '../controllers/PostController';
import asyncWrapper from '../helpers/asyncWrapper';
import { configurationStorage } from '../middlewares/storage';

const router = Router();
const postController = new PostController();
const multer = configurationStorage();

router.get(
  PostRoutes.ALL,
  asyncWrapper(postController.get.bind(postController)),
);
router.get(
  PostRoutes.GETBYID,
  asyncWrapper(postController.getById.bind(postController)),
);
router.post(
  PostRoutes.CREATE,
  multer.single(PostRoutes.MULTER_CREATE_FIELD),
  asyncWrapper(postController.create.bind(postController)),
);
router.put(
  PostRoutes.UPDATE,
  asyncWrapper(postController.update.bind(postController)),
);
router.delete(
  PostRoutes.DELETE,
  asyncWrapper(postController.delete.bind(postController)),
);

export default router;
