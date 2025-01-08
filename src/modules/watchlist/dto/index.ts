import { IsString } from 'class-validator';

export class WatchlistDto {
  @IsString()
  adsId: string;

  @IsString()
  description: string;
}