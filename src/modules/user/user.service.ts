import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepo: Repository<User>,
  ) {}
  async register(createUserDto: CreateUserDto) {
    try {
      const user = this._userRepo.create(createUserDto);

      // Check if email already exists
      const existingUser = await this._userRepo.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt();
      const passwordHash = createUserDto.password;
      const hash = await bcrypt.hash(passwordHash, salt);

      // Save user
      hash && (user.password = hash);
      await this._userRepo.save(user);

      //For not return the password in the response
      const { password, ...result } = user;
      return {
        message: 'User registered successfully',
        HttpStatus: HttpStatus.CREATED,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOneUser(email: string) {
    return await this._userRepo.findOne({
      where: { email: email },
    });
  }

  async findAll() {
    const users = await this._userRepo.find();
    const result = users.map((user) => {
      const { password, ...result } = user;
      return result;
    });
    return { success: result, status: HttpStatus.OK };
  }

  async deleteUser(id: string) {
    return await this._userRepo.delete(id);
  }

  async findOneUserById(id: string) {
    return await this._userRepo.findOne({
      where: { id: id },
    });
  }
}
