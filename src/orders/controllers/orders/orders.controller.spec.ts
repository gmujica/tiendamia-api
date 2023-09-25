import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from '../../application/orders/orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const mockOrder = {
      status: 'Approve',
      client: 'client name',
      shipping_address: '123 Main St, City, Country',
      shipping_promis: '2023-09-25 14:00:00',
      itemIds: [
        '079d8c23-335e-4571-b6c3-499dd9f4806c',
        '77adf013-f699-4046-9244-a1109dc7b773',
      ],
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {mockOrder} 
        }
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
