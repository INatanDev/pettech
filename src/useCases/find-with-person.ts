import { Person } from '@/entities/person.entity'
import { User } from '@/entities/user.entity'
import { UserRepository } from '@/repositories/user.repository'

export class FindWithPersonUseCase {
  constructor(private userRepository: UserRepository) {}

  async handler(userId: number): Promise<(User & Person) | undefined> {
    return this.userRepository.findWithPerson(userId)
  }
}
