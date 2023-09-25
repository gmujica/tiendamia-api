import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { Orders } from '../../infrastructure/entity/orders.entity';
import { Item } from '../../../item/infrastructure/entity/item.entiy';
import { Repository } from 'typeorm';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let orderRepository: Repository<Orders>;
  let itemRepository: Repository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Orders),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Item),
          useClass: Repository,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<Repository<Orders>>(
      getRepositoryToken(Orders),
    );
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const mockOrders = [{}, {}] as Orders[];
      jest.spyOn(orderRepository, 'find').mockResolvedValue(mockOrders);

      const result = await ordersService.findAll();

      expect(result).toEqual(mockOrders);
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const orderData = {
        status: 'Approve',
        client: 'client name',
        shipping_address: '123 Main St, City, Country',
        shipping_promise: new Date(),
      }; // order data
      const itemIds = [
        '079d8c23-335e-4571-b6c3-499dd9f4806c',
        '77adf013-f699-4046-9244-a1109dc7b773',
      ]; // item IDs
      const mockOrder = {} as Orders;

      jest.spyOn(orderRepository, 'create').mockReturnValue(mockOrder);
      jest.spyOn(itemRepository, 'findByIds').mockResolvedValue([]);
      jest.spyOn(orderRepository, 'save').mockResolvedValue(mockOrder);

      const result = await ordersService.createOrder(orderData, itemIds);

      expect(result).toEqual(mockOrder);
    });
  });

  describe('findOneById', () => {
    it('should throw NotFoundException if order is not found', async () => {
      const order_id = '9b82e814-9737-4c44-814f-b4932cc10683'; // non-existent order ID

      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

      await expect(ordersService.findOnebyId(order_id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('updateOrder', () => {
    it('should throw NotFoundException if order is not found', async () => {
      const order_id = '9b82e814-9737-4c44-814f-b4932cc10683'; // non-existent order ID
      const updatedOrderData = {
        client: 'client name',
        shipping_address: '123 Main St, City, Country',
        shipping_promise: new Date(),
      }; //updated order data

      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

      await expect(
        ordersService.updateOrder(order_id, updatedOrderData),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
