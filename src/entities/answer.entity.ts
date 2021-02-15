import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { QuestionEntity } from './question.entity';
import { classToPlain, Exclude, Expose } from 'class-transformer';

@Entity()
@Exclude()
export class AnswerEntity extends BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  content: string;

  @Column()
  extrovertPoints: number;

  @Column()
  introvertPoints: number;

  @Expose()
  @ManyToOne((type) => QuestionEntity, (question) => question.answers)
  question: QuestionEntity;

  toJSON() {
    return classToPlain(this);
  }
}
