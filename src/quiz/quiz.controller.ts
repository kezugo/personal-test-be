import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AnswerQuestionsDto } from '../dtos/answer-questions.dto';
import { QuizService } from './quiz.service';
import { QuizEntity } from '../entities/quiz.entity';
import { CreateQuizDto } from '../dtos/create-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Post('/create')
  @ApiBody({
    type: CreateQuizDto,
  })
  @ApiOperation({
    summary: 'Create a quiz with random question set',
  })
  async take(@Body() data: CreateQuizDto): Promise<QuizEntity> {
    return this.quizService.createQuiz(data.userName);
  }

  @Put('/answer-questions')
  @ApiOperation({
    summary: 'Calculate answers and update quiz with result',
  })
  @ApiBody({
    type: AnswerQuestionsDto,
  })
  async answerQuestions(@Body() data: AnswerQuestionsDto): Promise<QuizEntity> {
    const quiz = await this.quizService.answerQuestions(data);
    return quiz;
  }

  @Get('get-results/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiOperation({
    summary: 'Get quiz results',
  })
  async getResults(@Param('id') id: number): Promise<QuizEntity> {
    return this.quizService.getQuiz(id);
  }
}
