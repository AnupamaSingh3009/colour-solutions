import { Body, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { RegistrationStatus } from '../dtos/registration-status';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../dtos/login-user';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/dtos/jwt-payload';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post("register")
    public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> {
        const result: RegistrationStatus = await this.authService.register(createUserDto,);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
        }
        return result;  
    }

    @Post("login")
    public async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto);
    }

    @Get('whoami')
    @UseGuards(AuthGuard())
    public async testAuth(@Req() req: any): Promise<JwtPayload> {
        return req.user;
    }

}
