import { Item } from '../../../item/infrastructure/entity/item.entiy';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  order_id: string;

  @Column()
  status: string;

  @Column()
  client: string;

  @Column()
  shipping_address: string;

  @CreateDateColumn()
  shipping_promise: Date;

  @CreateDateColumn()
  created_date: Date;

  @ManyToMany(() => Item, (item) => item.orders)
  @JoinTable()
  items: Item[];
}
