import { ICreateUserDto } from "../dtos/ICreateUserDto";
import { User } from "../infra/typeorm/entities/User";

export interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(props: ICreateUserDto): Promise<User>;
}
