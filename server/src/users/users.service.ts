import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ToUserDto } from '../dtos/user-dto';
import { toUserDto } from '../shared/mapper';
import { LoginUserDto } from 'src/dtos/login-user';
import { compareSync } from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async createUser(createUserDto: CreateUserDto) {
        const {username} = createUserDto;
        // check if the user exists in the db
        const userInDb = await this.userRepository.findOne({ where: { username } });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const newUser = this.userRepository.create(createUserDto);
        return toUserDto(await this.userRepository.save(newUser));
    }

    async findByLogin({username, password}: LoginUserDto): Promise<ToUserDto> {
        const userDB = await this.userRepository.findOne({where : { username }});
        if(!userDB) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        if(!compareSync(password, userDB.password)) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return toUserDto(userDB);
    }

    async findByPayload({ username }: any): Promise<ToUserDto> {
        return toUserDto(await this.userRepository.findOne({ where: { username } }));
      }
}
