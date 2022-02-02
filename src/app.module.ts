import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentModule } from './document/document.module';
@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
