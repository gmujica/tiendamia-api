import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrdersService } from './application/orders/orders.service';
import { Orders } from './infrastructure/entity/orders.entity';
import { Item } from 'src/item/infrastructure/entity/item.entiy';


@Module({
  imports: [TypeOrmModule.forFeature([Orders, Item])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
