import { ObjectId } from 'mongodb';
import { CommentDTOType } from '../dtos/CommentDTO';
import { Post } from '../models/PostModel';
import { PostModelType } from '../models/PostModel';
import BaseRepository from './BaseRepository';

export default class PostRepository extends BaseRepository<PostModelType> {
  constructor() {
    super(Post);
  }

  async createComment(
    id: ObjectId,
    postData: PostModelType,
    comment: CommentDTOType,
  ): Promise<PostModelType> {
    return (await Post.findByIdAndUpdate(
      id,
      { comments: [...(postData.comments || []), comment] },
      { new: true },
    ).exec()) as PostModelType;
  }

  async deleteComment(
    id: ObjectId,
    commentId: ObjectId,
    postData: PostModelType,
  ): Promise<void> {
    const comments = postData.comments
      ? postData.comments.filter(
          (comment) => comment._id.toString() !== commentId.toString(),
        )
      : [];

    await Post.findByIdAndUpdate(id, { comments }, { new: true }).exec();
  }
}
