import { Injectable } from '@nestjs/common';
import { QuestionEntity } from '../entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizEntity } from '../entities/quiz.entity';
import { AnswerDto, AnswerQuestionsDto } from '../dtos/answer-questions.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuestionEntity)
    private contactRepository: Repository<QuestionEntity>,
  ) {}

  async createQuiz(userName: string): Promise<QuizEntity> {
    const questions = await QuestionEntity.find();
    const quiz = QuizEntity.create();
    quiz.questions = [];
    let n = 3;
    let len = questions.length;
    const taken = new Array(len);
    while (n--) {
      const x = Math.floor(Math.random() * len);
      quiz.questions.push(questions[x in taken ? taken[x] : x]);
      taken[x] = --len in taken ? taken[len] : len;
    }
    quiz.userName = userName;
    await quiz.save();
    return await QuizEntity.findOne(quiz.id, {
      relations: ['questions', 'questions.answers'],
    });
  }

  async answerQuestions(data: AnswerQuestionsDto): Promise<QuizEntity> {
    const quiz = await QuizEntity.findOne(data.quizId, {
      relations: ['questions', 'questions.answers'],
    });

    const points = [0, 0]; // extrovertPoints = 0, introvertPoints = 0;

    const reducer = (
      accumulator: [number, number],
      currentValue: AnswerDto,
    ) => {
      const answerId = currentValue.answerId;
      const questionId = currentValue.questionId;
      const questions = quiz.questions.filter(
        (entity) => entity.id === questionId,
      );

      if (questions[0] && questions[0].answers) {
        const answer = questions[0].answers.filter(
          (entity) => answerId == entity.id,
        );

        if (answer[0]) {
          accumulator = [
            answer[0].extrovertPoints + accumulator[0],
            answer[0].introvertPoints + accumulator[1],
          ];
        }
      }
      return accumulator;
    };

    const finalPoints = data.answers.reduce(reducer, points);

    quiz.extrovertPoints = finalPoints[0];
    quiz.introvertPoints = finalPoints[1];

    quiz.type =
      quiz.extrovertPoints > quiz.introvertPoints ? 'extrovert' : 'introvert';
    await quiz.save();

    return quiz;
  }

  async getQuiz(id: number): Promise<QuizEntity> {
    return QuizEntity.findOne({ id });
  }
}
