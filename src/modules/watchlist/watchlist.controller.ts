import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistDto } from './dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Get()
  getAllAds() {
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-ads')
  createAds(@Body() dto: WatchlistDto, @Req() request): Promise<WatchlistDto> {
    const user = request.user;
    return this.watchlistService.createAds(user, dto)
  }

  @Patch('update-ads')
  updateAds() {}

  @Delete('delete-ads')
  deleteAds(@Query('id') id: string ) {}

}
