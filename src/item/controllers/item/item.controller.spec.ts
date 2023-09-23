import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from '../../application/item/item.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../../infrastructure/entity/item.entiy';
import { ItemRepositoryMock } from '../../infrastructure/repository/item.repository.mock';

describe('ItemController', () => {
  let itemController: ItemController;
  let itemService: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        ItemService,
        {
          provide: getRepositoryToken(Item),
          useClass: ItemRepositoryMock, 
        },
      ],
    }).compile();

    itemController = module.get<ItemController>(ItemController);
    itemService = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(itemController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const items: Item[] = [];
      jest.spyOn(itemService, 'findAll').mockResolvedValue(items);

      const result = await itemController.findAll();

      expect(result).toEqual(items);
    });
  });

  describe('findOne', () => {
    it('should return a single item by ID', async () => {
      const itemId = 'some-item-id';
      const item: Item = {
        item_id: itemId,
        title: 'Sample Item',
        description: 'Description of the item',
        price: '19.99',
        url: 'https://example.com/item',
        quantity: 10,
        created_at: new Date(),
        updated_at: new Date(),
        orders: [],
    };
      jest.spyOn(itemService, 'findOne').mockResolvedValue(item);

      const result = await itemController.findOne(itemId);

      expect(result).toEqual(item);
    });

    it('should return null if item is not found', async () => {
      const itemId = 'non-existent-item-id';
      jest.spyOn(itemService, 'findOne').mockResolvedValue(null);

      const result = await itemController.findOne(itemId);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new item', async () => {
      const newItem: Item = {
        title: 'New Item',
        description: 'Description of the new item',
        price: '29.99',
        url: 'https://example.com/new-item',
        quantity: 20,
        created_at: new Date(),
        updated_at: new Date(),
        orders: [],
        item_id: '079d8c23-335e-4571-b6c3-499dd9f4806c'
    };
      jest.spyOn(itemService, 'create').mockResolvedValue(newItem);

      const result = await itemController.create(newItem);

      expect(result).toEqual(newItem);
    });
  });
});
