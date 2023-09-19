import { Item } from "src/item/infrastructure/entity/item.entiy";
import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, OneToMany } from "typeorm";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  status: string;

  @Column()
  client: string;

  @Column()
  shipping_address: string;

  @CreateDateColumn()
  shipping_romise: Date;

  @CreateDateColumn()
  created_date: Date;


  @OneToMany(() => Item, item => item.id)
  items: Item[];
}
