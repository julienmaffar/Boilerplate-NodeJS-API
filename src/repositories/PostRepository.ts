import { Post } from '../models/PostModel';
import { PostModelType } from '../models/PostModel';
import BaseRepository from './BaseRepository';

export default class PostRepository extends BaseRepository<PostModelType> {
  constructor() {
    super(Post);
  }
}
