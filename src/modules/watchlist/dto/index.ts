import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WatchlistDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}
