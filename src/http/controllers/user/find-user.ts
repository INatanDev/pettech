import { UserRepository } from '@/repositories/user.repository'
import { FindWithPersonUseCase } from '@/useCases/find-with-person'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findUser(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = registerParamsSchema.parse(request.params)

  try {
    const userRepository = new UserRepository()

    const findWithPersonUseCase = new FindWithPersonUseCase(userRepository)

    const user = await findWithPersonUseCase.handler(id)

    return reply.status(200).send(user)
  } catch (error) {
    console.error(error)
    throw new Error('Error finding user')
  }
}
