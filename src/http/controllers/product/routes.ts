import { create } from './create'
import { FastifyInstance } from 'fastify'

export async function productRoutes(app: FastifyInstance) {
  app.post('/product', create)
}
