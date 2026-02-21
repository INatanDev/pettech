import { UserRepository } from '@/repositories/user.repository'
import { CreateUserUseCase } from '@/useCases/create-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  try {
    const userRepository = new UserRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)

    const user = await createUserUseCase.handler({
      username,
      password,
    })

    return reply.status(201).send(user)
  } catch (error) {
    console.error(`Error creating user: ${error}`)

    throw new Error(`Error creating user: ${error}`)
  }
}
