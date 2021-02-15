import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { AnswerEntity } from './answer.entity';

@Entity()
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @OneToMany((type) => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];
}
