import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { paginate, Pagination } from '../helpers/pagination';

type Select = string[];

export type BaseRepositoryType<T> = {
  findAll(
    limit: number,
    page?: number,
    select?: Select,
    sort?: string,
  ): Promise<Pagination<T>>;
  findById(id: ObjectId, select?: Select): Promise<T>;
  create(item: Partial<T>): Promise<void>;
  update(id: ObjectId, item: T): Promise<T>;
  delete(id: ObjectId): Promise<void>;
};

export default class BaseRepository<T> implements BaseRepositoryType<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(
    limit: number = 10,
    page: number = 0,
    select?: Select,
    sort?: string,
  ): Promise<Pagination<T>> {
    const query = this.model.find<T>();
    if (select) query.select(select);
    if (sort) query.sort(sort);

    if (page > 0) {
      const skip = limit * (page - 1);
      query.skip(skip);
    }

    query.limit(limit);
    const docs = await query.exec();

    return paginate(docs, limit, page, 'azeae');
  }

  async findById(id: ObjectId, select: Select = []): Promise<T> {
    return (await this.model.findById(id, select).exec()) as T;
  }

  async create(item: T): Promise<void> {
    await this.model.create(item);
  }

  async update(id: ObjectId, item: T): Promise<T> {
    return (await this.model
      .findByIdAndUpdate(id, item as any, { new: true })
      .exec()) as T;
  }

  async delete(id: ObjectId): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
