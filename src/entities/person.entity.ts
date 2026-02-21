export class Person {
  id?: number
  cpf: string
  name: string
  birth: Date
  email: string
  user_id?: number

  constructor(id: number, cpf: string, name: string, birth: Date, email: string) {
    this.id = id
    this.cpf = cpf
    this.name = name
    this.birth = birth
    this.email = email
  }
}
