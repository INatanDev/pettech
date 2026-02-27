import { create } from './create'
import { FastifyInstance } from 'fastify'
import { deleteProduct } from './delete'
import { findAllProducts } from './find-all-products'
import { findProduct } from './find-product'
import { update } from './update'

export async function productRoutes(app: FastifyInstance) {
  app.get('/product', findAllProducts)
  app.get('/product/:id', findProduct)
  app.post('/product', create)
  app.put('/product/:id', update)
  app.delete('/product/:id', deleteProduct)
}
