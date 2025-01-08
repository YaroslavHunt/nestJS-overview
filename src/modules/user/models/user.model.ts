import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Watchlist } from '../../watchlist/models/watchlist.model';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;

  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  watchlist: Watchlist[]
}