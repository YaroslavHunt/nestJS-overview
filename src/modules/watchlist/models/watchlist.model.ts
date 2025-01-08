import { Column, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';

@Table
export class Watchlist extends Model {
  @Column
  name:string;

  @Column
  assetId: string;

  @Column
  user: User;
}