import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { Auth } from './entities/auth.entity';
import { JwtStrategy } from './jwt.stategy';
import { JwtModule } from '@nestjs/jwt';
import constants from 'src/constants';
@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      signOptions: { expiresIn: 60 * 24 * constants.EXPIRATION_TIME },
      secret: constants.SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
