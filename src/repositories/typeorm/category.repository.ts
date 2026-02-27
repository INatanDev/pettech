import { Category } from '@/entities/category.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Repository } from 'typeorm'
import { ICategoryRepository } from '../category.repository.interface'

export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = appDataSource.getRepository(Category)
  }

  async create(name: string): Promise<void> {
    await this.repository.save({
      name,
    })
  }
}
