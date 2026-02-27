import { makeSignInUseCase } from '@/useCases/factory/make-signin-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '@/useCases/errors/invalid-credencials-error'

export async function signin(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  const signInUseCase = makeSignInUseCase()
  const user = await signInUseCase.handler(username)

  const doesPasswordMatch = await compare(password, user.password)

  if (!doesPasswordMatch) {
    throw new InvalidCredentialsError()
  }

  const token = await reply.jwtSign({
    username,
  })

  return reply.status(200).send({ token })
}
