import { IProductRepository } from '@/repositories/product.repository.interface'
import { IProduct } from '@/entities/models/product.interface'

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async handler(product: IProduct) {
    return this.productRepository.update(product)
  }
}
