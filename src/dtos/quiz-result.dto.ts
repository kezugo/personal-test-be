import { PersonalityType } from '../common';
import { ApiProperty } from '@nestjs/swagger';

export class QuizResultDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: PersonalityType;

  @ApiProperty()
  extrovertPoints: number;

  @ApiProperty()
  introvertPoints: number;
}
