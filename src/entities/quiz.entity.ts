import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { QuestionEntity } from './question.entity';
import { PersonalityType } from '../common';

@Entity()
export class QuizEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    default: 0,
  })
  extrovertPoints: number;

  @Column({
    default: 0,
  })
  introvertPoints: number;

  @Column({
    nullable: true,
  })
  type: PersonalityType;

  @ManyToMany((type) => QuestionEntity)
  @JoinTable()
  questions: QuestionEntity[];
}
