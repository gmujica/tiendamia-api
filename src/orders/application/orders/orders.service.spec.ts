import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderRepositoryMock } from '../../infrastructure/repository/orders.repository.mock';
import { ItemRepositoryMock } from '../../../item/infrastructure/repository/item.repository.mock'
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Orders } from '../../infrastructure/entity/orders.entity';
import { Item } from '../../../item/infrastructure/entity/item.entiy';

describe('OrdersService', () => {
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Orders),
          useClass: OrderRepositoryMock,
        },
        {
          provide: getRepositoryToken(Item),
          useClass: ItemRepositoryMock,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      // Implement test logic here
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      // Implement test logic here
    });
  });

  describe('findOnebyId', () => {
    it('should return a single order by ID', async () => {
      // Implement test logic here
    });

    it('should throw NotFoundException if order is not found', async () => {
      // Implement test logic here
    });
  });

  describe('updateOrder', () => {
    it('should update an existing order by ID', async () => {
      // Implement test logic here
    });

    it('should throw NotFoundException if order is not found', async () => {
      // Implement test logic here
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order by ID', async () => {
      // Implement test logic here
    });

    it('should throw NotFoundException if order is not found', async () => {
      // Implement test logic here
    });
  });
});
