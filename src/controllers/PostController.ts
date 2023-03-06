import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import PostDTO from '../dtos/PostDTO';
import { MissingFieldError } from '../errors/app.errors';
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
    await this.postRepository.delete(getValidObjectId(id));
    res.sendStatus(204);
  }
}
