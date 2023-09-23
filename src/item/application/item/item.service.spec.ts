import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../../infrastructure/entity/item.entiy';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ItemService', () => {
  let itemService: ItemService;
  let itemRepository: Repository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: getRepositoryToken(Item),
          useClass: Repository,
        },
      ],
    }).compile();

    itemService = module.get<ItemService>(ItemService);
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  it('should be defined', () => {
    expect(itemService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const items: Item[] = [{}, {}] as Item[];
      jest.spyOn(itemRepository, 'find').mockResolvedValue(items);

      const result = await itemService.findAll();

      expect(result).toEqual(items);
    });
  });

  describe('findOne', () => {
    it('should return a single item by ID', async () => {
      const itemId = '079d8c23-335e-4571-b6c3-499dd9f4806c';
      const item: Item = {} as Item;
      jest.spyOn(itemRepository, 'findOne').mockResolvedValue(item);
  
      const result = await itemService.findOne(itemId);
  
      expect(result).toEqual(item);
    });
  
    it('should throw NotFoundException if item is not found', async () => {
      const itemId = 'non-existent-item-id';
      jest.spyOn(itemRepository, 'findOne').mockResolvedValue(undefined);
    
      try {
        await itemService.findOne(itemId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
