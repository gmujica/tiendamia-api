import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReportsService } from '../../application/reports/reports.service';
import { Orders } from '../../../orders/infrastructure/entity/orders.entity';
import { DateRangeDto } from '../../infrastructure/dto/date-range.dto';
import { Item } from '../../../item/infrastructure/entity/item.entiy';
import { Repository } from 'typeorm';

describe('ReportsController', () => {
  let controller: ReportsController;
  let reportsService: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Orders),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Item), // Provide ItemRepository
          useClass: Repository, // Assuming you have imported the Repository class from TypeORM
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
    reportsService = module.get<ReportsService>(ReportsService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTravelingOrdersReport', () => {
    it('should return an array of orders', async () => {
      const dateRangeDto: DateRangeDto = {
        startDate: '2023-01-01',
        endDate: '2023-12-31',
      };
      const startDate = '2023-01-01';
      const endDate = '2023-12-31';
      const mockOrdersData: Orders[] = [
        {
          order_id: '1',
          client: 'Client A',
          shipping_address: 'Address A',
          shipping_promise: new Date(),
          status: 'Traveling',
          created_date: new Date(),
          items: [],
        },
        {
          order_id: '2',
          client: 'Client B',
          shipping_address: 'Address B',
          shipping_promise: new Date(),
          status: 'Traveling',
          created_date: new Date(),
          items: [],
        },
      ];

      jest
        .spyOn(reportsService, 'getTravelingOrdersReport')
        .mockResolvedValue(mockOrdersData);

      const result = await controller.getTravelingOrdersReport(
        startDate,
        endDate,
      );

      expect(result).toEqual(mockOrdersData);
    });
  });

  describe('getApproveOrdersWithShippingPromiseDeadline', () => {
    it('should return an array of orders', async () => {
      const mockOrdersData: Orders[] = [
        {
          order_id: '3',
          client: 'Client C',
          shipping_address: 'Address C',
          shipping_promise: new Date(),
          status: 'Approve',
          created_date: new Date(),
          items: [],
        },
        {
          order_id: '4',
          client: 'Client D',
          shipping_address: 'Address D',
          shipping_promise: new Date(),
          status: 'Approve',
          created_date: new Date(),
          items: [],
        },
      ];

      jest
        .spyOn(reportsService, 'getApproveOrdersWithShippingPromiseDeadline')
        .mockResolvedValue(mockOrdersData);

      const result =
        await controller.getApproveOrdersWithShippingPromiseDeadline();

      expect(result).toEqual(mockOrdersData);
    });
  });
});
