import { makeCreateUserUseCase } from '@/useCases/factory/make-create-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { hash } from 'bcryptjs'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  const hashPassword = await hash(password, 8)

  const createUserUseCase = makeCreateUserUseCase()

  const userWithHashPassword = {
    username,
    password: hashPassword,
  }

  const user = await createUserUseCase.handler(userWithHashPassword)

  return reply.status(201).send({ id: user?.id, username: user?.username })
}
