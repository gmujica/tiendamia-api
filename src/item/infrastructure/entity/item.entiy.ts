import { Orders } from "src/orders/infrastructure/entity/orders.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Orders, (order) => order.items)
  @JoinColumn({ name: "id" })
  order: Orders;

}
