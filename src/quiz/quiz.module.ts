import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuestionEntity } from '../entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [QuizController],
  providers: [QuizService],
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
})
export class QuizModule {}
