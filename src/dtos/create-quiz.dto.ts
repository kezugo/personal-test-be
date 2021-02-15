import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty()
  userName: string;
}
