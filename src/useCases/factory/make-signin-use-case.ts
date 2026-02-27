import { UserRepository } from '@/repositories/pg/user.repository'
import { SignInUseCase } from '../signin'

export function makeSignInUseCase() {
  const userRepository = new UserRepository()
  const signinUseCase = new SignInUseCase(userRepository)
  return signinUseCase
}
