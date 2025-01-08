import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { User } from '../user/models/user.model';
import { WatchlistDto } from './dto';
import { CreateAdsResponse } from './response';

@Injectable()
export class WatchlistService {
  constructor(@InjectModel(Watchlist) readonly watchlistRepository: typeof Watchlist) {
  }

  async createAds(user: User, dto: WatchlistDto): Promise<CreateAdsResponse> {
    const watchlist = {
      user: user.id,
      title: dto.title,
      description: dto.description,
    };
    await this.watchlistRepository.create(watchlist);
    return watchlist;
  }

  async updateAds(userId: number, adsId: number, dto: WatchlistDto): Promise<WatchlistDto> {
    await this.watchlistRepository.update(dto, { where: { user: userId, id: adsId } });
    return dto;
  }

  async deleteAds(userId: number, adsId: number): Promise<boolean> {
    await this.watchlistRepository.destroy({ where: { user: userId, id: adsId } });
    return true;
  }
}
