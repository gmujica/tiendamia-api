import { Orders } from 'src/orders/infrastructure/entity/orders.entity';
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

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  /*@ManyToOne(() => Orders, (order) => order.items)
  order: Orders;*/

  @ManyToMany(() => Orders, (order) => order.items)
  orders: Orders[];
}
