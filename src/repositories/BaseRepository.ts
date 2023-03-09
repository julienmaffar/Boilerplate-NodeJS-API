import { ObjectId } from 'mongodb';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
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
  create(item: Partial<T>): Promise<T>;
  update(id: ObjectId, item: T): Promise<T>;
  deleteById(id: ObjectId): Promise<void>;
  deleteByFilter(filter: FilterQuery<T>, multi: boolean): Promise<void>;
};

export default class BaseRepository<T> implements BaseRepositoryType<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(
    limit = 10,
    page = 0,
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

  async create(item: T): Promise<T> {
    return (await this.model.create(item)) as T;
  }

  async update(id: ObjectId, item: T): Promise<T> {
    return (await this.model
      .findByIdAndUpdate(id, item as UpdateQuery<T>, { new: true })
      .exec()) as T;
  }

  async deleteById(id: ObjectId): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async deleteByFilter(filter: FilterQuery<T>, multi: boolean): Promise<void> {
    if (multi) {
      await this.model.deleteMany(filter);
    } else {
      await this.model.deleteOne(filter);
    }
  }
}
