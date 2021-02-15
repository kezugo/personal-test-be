import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty()
  questionId: number;
  @ApiProperty()
  answerId: number;
}

export class AnswerQuestionsDto {
  @ApiProperty()
  quizId: number;

  @ApiProperty({
    type: [AnswerDto],
  })
  answers: AnswerDto[];
}
