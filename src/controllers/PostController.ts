import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import CommentDTO from '../dtos/CommentDTO';
import PostDTO from '../dtos/PostDTO';
import { MissingFieldError, NotFoundError } from '../errors/app.errors';
import { getValidObjectId } from '../helpers/helpers';
import PostRepository from '../repositories/PostRepository';

export default class PostController {
  private postRepository: PostRepository;

  private limit: number;

  constructor() {
    this.limit = 20;
    this.postRepository = new PostRepository();
  }

  public async get(req: ExpressRequest, res: ExpressResponse) {
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : this.limit;
    const pageNumber = req.query.page ? parseInt(req.query.page as string) : 1;

    const posts = await this.postRepository.findAll(
      limit,
      pageNumber,
      undefined,
      'field -title',
    );
    res.send(posts);
  }

  public async getById(req: ExpressRequest, res: ExpressResponse) {
    const { id } = req.params;
    if (!id) throw new MissingFieldError('id');
    const post = await this.postRepository.findById(getValidObjectId(id));
    if (!post) throw new NotFoundError('Post is not found');
    res.send(post);
  }

  public async create(req: ExpressRequest, res: ExpressResponse) {
    if (!req.file) throw new MissingFieldError('picture');
    const postDTO = new PostDTO({ ...req.body, picture: req.file.path });
    await this.postRepository.create(postDTO.toPost());
    res.sendStatus(201);
  }

  public async update(req: ExpressRequest, res: ExpressResponse) {
    const { id } = req.params;
    if (!id) throw new MissingFieldError('id');
    const postDTO = new PostDTO(req.body);
    const post = this.postRepository.update(getValidObjectId(id), postDTO);
    res.send(post);
  }

  public async delete(req: ExpressRequest, res: ExpressResponse) {
    const { id } = req.params;
    if (!id) throw new MissingFieldError('id');
    await this.postRepository.deleteById(getValidObjectId(id));
    res.sendStatus(204);
  }

  public async createComments(req: ExpressRequest, res: ExpressResponse) {
    const { id } = req.params;
    if (!id) throw new MissingFieldError('id');
    const post = await this.postRepository.findById(getValidObjectId(id));
    if (!post) throw new NotFoundError('Post is not found');
    const commentDTO = new CommentDTO(req.body);
    await this.postRepository.createComment(
      getValidObjectId(id),
      post,
      commentDTO.toComment(),
    );
    res.sendStatus(201);
  }

  public async deleteComment(req: ExpressRequest, res: ExpressResponse) {
    const { id, commentId } = req.params;
    if (!id || !commentId) throw new MissingFieldError('id or commentId');
    const post = await this.postRepository.findById(getValidObjectId(id));
    if (!post) throw new NotFoundError('Post is not found');
    await this.postRepository.deleteComment(
      getValidObjectId(id),
      getValidObjectId(commentId),
      post,
    );
    res.sendStatus(204);
  }
}
