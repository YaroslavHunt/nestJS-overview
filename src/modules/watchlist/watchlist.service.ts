import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { User } from '../user/models/user.model';
import { WatchlistDto } from './dto';

@Injectable()
export class WatchlistService {
  constructor(@InjectModel(Watchlist) readonly watchlistRepository: typeof Watchlist) {}

  async createAds(user:User , dto: WatchlistDto) {
    const watchlist = {
      user: user.id,
      description: dto.description,
      adsId:dto.adsId
    }
    await this.watchlistRepository.create(watchlist);
    return watchlist;
  }
}
