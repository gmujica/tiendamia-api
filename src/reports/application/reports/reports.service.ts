import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../../item/infrastructure/entity/item.entiy';
import { Orders } from '../../../orders/infrastructure/entity/orders.entity';
import { DateRangeDto } from '../../infrastructure/dto/date-range.dto';
import { Between, LessThan, Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}
  // traveling report
  async getTravelingOrdersReport(
    dateRangeDto: DateRangeDto,
  ): Promise<Orders[]> {
    const { startDate, endDate } = dateRangeDto;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    const report = await this.orderRepository.find({
      where: {
        status: 'Traveling',
        shipping_promise: Between(parsedStartDate, parsedEndDate),
      },
    });

    return report;
  }
  // Get orders in "Approve" status with less than 2 days left for shipping promise
  async getApproveOrdersWithShippingPromiseDeadline(): Promise<Orders[]> {
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

    const orders = await this.orderRepository.find({
      where: {
        status: 'Approve',
        shipping_promise: LessThan(twoDaysFromNow),
      },
    });

    return orders;
  }
}
