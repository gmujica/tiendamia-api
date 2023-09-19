import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrdersService } from './application/orders/orders.service';


@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
