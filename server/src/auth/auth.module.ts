import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
  property: 'user',
  session: false
});
const jwtModule = JwtModule.register({
  secret: process.env.SECRET_KEY, 
  signOptions: {
    expiresIn: process.env.EXPIRES_IN
  }
});

@Module({
  imports: [
    passportModule,
    jwtModule,
    UsersModule
  ],
  providers: [AuthService,  JwtStrategy],
  controllers: [AuthController],
  exports: [passportModule, jwtModule]
})
export class AuthModule {}
