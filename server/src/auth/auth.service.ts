import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import { RegistrationStatus } from '../dtos/registration-status';
import { LoginUserDto } from 'src/dtos/login-user';
import { JwtService } from '@nestjs/jwt';
import { LoginStatus } from '../dtos/login-status';
import { ToUserDto } from 'src/dtos/user-dto';
import { JwtPayload } from 'src/dtos/jwt-payload';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
          success: true,
          message: 'user registered',
        };
    
        try {
          await this.usersService.createUser(userDto);
        } catch (err) {
          status = {
            success: false,
            message: err,
          };
        }
    
        return status;
    }


    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
        // find user in db
        const user = await this.usersService.findByLogin(loginUserDto);
    
        // generate and sign token
        const token = this._createToken(user);
    
        return {
          username: user.username,
          ...token,
        };
      }
    
    async validateUser({username}: JwtPayload): Promise<any> {
        const user = await this.usersService.findByPayload(username);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    
    private _createToken({ username }: ToUserDto): any {
        const expiresIn = this.configService.get<string>('EXPIRES_IN');
        const user: JwtPayload = { username };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn,
            accessToken,
        };
    }

}
