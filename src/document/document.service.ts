import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { Express } from 'express';
import { extname } from 'path';
@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private docRepository: Repository<Document>,
  ) {}

  create(createDocumentDto: CreateDocumentDto) {
    return;
  }

  uploadFile(userId: string, file: Express.Multer.File) {
    let data = {
      documentType: file.fieldname,
      description: file.mimetype,
      fileUrl: file.path,
      fileName: file.originalname,
      fileExtension: extname(file.originalname),
      userId: userId,
    };
    return this.docRepository.save(data);
  }

  findAll() {
    return `This action returns all document`;
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
