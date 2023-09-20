import { Orders } from "src/orders/infrastructure/entity/orders.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  item_id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  quantity: number;

  /*@ManyToOne(() => Orders, (order) => order.items)
  @JoinColumn({ name: "items" }) // Use a proper column name that corresponds to the foreign key
  order: Orders;*/

  /*@ManyToOne(() => Orders, (order) => order.items)
  @JoinColumn({ name: "order_id" })
  order: Orders;*/



}
