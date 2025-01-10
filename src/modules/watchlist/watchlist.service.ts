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
    try {
      const watchlist = {
        user: user.id,
        title: dto.title,
        description: dto.description,
      };
      await this.watchlistRepository.create(watchlist);
      return watchlist;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateAds(userId: number, adsId: number, dto: WatchlistDto): Promise<WatchlistDto> {
    try {
      await this.watchlistRepository.update(dto, { where: { user: userId, id: adsId } });
      return dto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteAds(userId: number, adsId: number): Promise<boolean> {
    try {
      await this.watchlistRepository.destroy({ where: { user: userId, id: adsId } });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
