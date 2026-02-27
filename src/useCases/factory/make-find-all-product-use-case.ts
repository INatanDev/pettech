import { ProductRepository } from '@/repositories/typeorm/product.repository'
import { FindAllProductUseCase } from '../find-all-products'

export function makeFindAllProductUseCase() {
  const productRepository = new ProductRepository()
  const findAllProductUseCase = new FindAllProductUseCase(productRepository)
  return findAllProductUseCase
}
