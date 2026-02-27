import { IProductRepository } from '@/repositories/product.repository.interface'

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async handler(id: string) {
    return this.productRepository.delete(id)
  }
}
