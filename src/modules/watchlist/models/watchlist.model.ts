import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';

@Table
export class Watchlist extends Model {
  @Column
  adsId: string;

  @Column
  description:string;

  @ForeignKey(() => User)
  user: User;
}