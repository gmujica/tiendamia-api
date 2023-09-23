import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../item/infrastructure/entity/item.entiy';
import { Orders } from '../orders/infrastructure/entity/orders.entity';
import { ReportsController } from './controllers/reports/reports.controller';
import { ReportsService } from './application/reports/reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Item])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
