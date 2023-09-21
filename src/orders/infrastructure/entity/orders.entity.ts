import { Item } from "src/item/infrastructure/entity/item.entiy";
import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, OneToMany, JoinColumn, ManyToOne, JoinTable, ManyToMany } from "typeorm";

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

  /*@OneToMany(() => Item, (item) => item.item_id)
  items: Item[];*/

  @ManyToMany(() => Item, (item) => item.orders)
  @JoinTable()
  items: Item[];

}
