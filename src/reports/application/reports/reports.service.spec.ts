import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { Orders } from '../../../orders/infrastructure/entity/orders.entity';
import { Item } from '../../../item/infrastructure/entity/item.entiy';
import { DateRangeDto } from '../../infrastructure/dto/date-range.dto';

describe('ReportsService', () => {
  let service: ReportsService;
  const mockOrderRepository = {
    find: jest.fn(),
  };
  const mockItemRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Orders),
          useValue: mockOrderRepository,
        },
        {
          provide: getRepositoryToken(Item),
          useValue: mockItemRepository,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return traveling orders report', async () => {
    const dateRangeDto: DateRangeDto = {
      startDate: '2023-01-01',
      endDate: '2023-12-31',
    };
    const mockOrdersData = [{ status: 'Traveling' }, { status: 'Traveling' }];

    mockOrderRepository.find.mockResolvedValue(mockOrdersData);

    const result = await service.getTravelingOrdersReport(dateRangeDto);

    expect(result).toEqual(mockOrdersData);
    expect(mockOrderRepository.find).toHaveBeenCalledWith({
      where: {
        status: 'Traveling',
        shipping_promise: expect.any(Object), // You can use expect.any for date comparison
      },
    });
  });

  it('should return approve orders with shipping promise deadline', async () => {
    const mockOrdersData = [{ status: 'Approve' }, { status: 'Approve' }];
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

    mockOrderRepository.find.mockResolvedValue(mockOrdersData);

    const result = await service.getApproveOrdersWithShippingPromiseDeadline();

    expect(result).toEqual(mockOrdersData);
    expect(mockOrderRepository.find).toHaveBeenCalledWith({
      where: {
        status: 'Approve',
        shipping_promise: expect.any(Object), // You can use expect.any for date comparison
      },
    });
  });
});
