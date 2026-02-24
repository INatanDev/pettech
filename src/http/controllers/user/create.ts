import { makeCreateUserUseCase } from '@/useCases/factory/make-create-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  const createUserUseCase = makeCreateUserUseCase()

  const user = await createUserUseCase.handler({
    username,
    password,
  })

  return reply.status(201).send(user)
}
