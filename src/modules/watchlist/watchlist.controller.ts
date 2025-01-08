import { Body, Controller, Delete, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistDto } from './dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { ApiResponse } from '@nestjs/swagger';
import { CreateAdsResponse } from './response';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {
  }

  @ApiResponse({status: 201, type: CreateAdsResponse})
  @UseGuards(JwtAuthGuard)
  @Post('create-ads')
  createAds(@Body() dto: WatchlistDto, @Req() request): Promise<CreateAdsResponse> {
    const user = request.user;
    return this.watchlistService.createAds(user, dto);
  }

  @ApiResponse({ status: 202, type: WatchlistDto })
  @UseGuards(JwtAuthGuard)
  @Patch('update-ads')
  updateAds(
    @Body() dto: WatchlistDto,
    @Query('id') adsId: number,
    @Req() request
  ): Promise<WatchlistDto> {
    const { id } = request.user;
    return  this.watchlistService.updateAds(id, adsId, dto);
  }

  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Delete('delete-ads')
  deleteAds(@Query('id') adsId: number, @Req() request): Promise<boolean> {
    const { id } = request.user;
    return this.watchlistService.deleteAds(id, adsId);
  }

}
