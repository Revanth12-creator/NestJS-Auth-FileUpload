import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Document } from 'src/document/entities/document.entity';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true, default: 'default-profile-image.jpg', length: 250 })
  profilePic: string;

  @OneToMany(() => Document, (doc) => doc.user)
  document: Document[];
}
