import { Orders } from '../../../orders/infrastructure/entity/orders.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  item_id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  url: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Orders, (order) => order.items)
  orders: Orders[];
}
