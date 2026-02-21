import { create } from './create'
import { FastifyInstance } from 'fastify'

export async function personRoutes(app: FastifyInstance) {
  app.post('/person', create)
}
