import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import constants from 'src/constants';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtSwervice: JwtService,
  ) {}

  findEmail(email: string) {
    return this.authRepository.findOne({ where: { email: email } });
  }

  async create(createAuthDto: CreateAuthDto) {
    let { name, email } = createAuthDto;
    let password = '1234';

    let isUserAvailable = await this.findEmail(email);
    if (isUserAvailable) {
      throw new HttpException({ message: 'User already exists' }, 400);
    }
    const pwd = await this.hashPassword(password);
    let user = {
      name: name,
      email: email,
      password: pwd,
    };
    const createUser = await this.authRepository.create(user);
    try {
      return this.authRepository.save(createUser);
    } catch (e) {
      console.log(e);
    }
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async validateUser(login: LoginDto) {
    let { email, password } = login;
    try {
      let user = await this.findEmail(email);
      if (!user) {
        throw new HttpException({ message: 'User not found' }, 401);
      }

      let isVerified = await bcrypt.compare(password, user.password);
      if (!isVerified) {
        throw new HttpException({ message: 'Invalid login details' }, 401);
      }

      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async loginUser(login: LoginDto) {
    let user = await this.validateUser(login);
    let payload = { sub: user.userId, id: user.userId };
    const token = this.jwtSwervice.sign(payload);
    let userData = {
      message: 'Login successful',
      access_token: token,
      userDetails: user,
      expiresIn: constants.EXPIRATION_TIME * 60,
    };
    return userData;
  }

  findAll() {
    return this.authRepository.find();
  }

  findOne(id: string) {
    return this.authRepository.findOne(id);
  }

  remove(id: string) {
    return this.authRepository.delete(id);
  }

  updateProfile(id: string, file: Express.Multer.File) {
    return this.authRepository.update(id, {
      profilePic: file.path,
    });
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return this.authRepository.update(id, updateAuthDto);
  }
}
