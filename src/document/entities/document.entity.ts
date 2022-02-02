import { Auth } from 'src/auth/entities/auth.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  documentType: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ nullable: true })
  fileName: string;

  @Column({ nullable: true })
  fileExtension: string;

  @Column()
  userId: string;

  @ManyToOne(() => Auth, (user) => user.document)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: Auth;
}
