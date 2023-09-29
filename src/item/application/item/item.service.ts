import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../infrastructure/entity/item.entiy';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}
  //get all items
  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }
  //get one item
  async findOne(item_id: string): Promise<Item | undefined> {
    const item = await this.itemRepository.findOne({
      where: { item_id },
    });

    return item || undefined;
  }

  //create item
  async create(item: Item): Promise<Item> {
    const newItem = this.itemRepository.create(item);
    const savedItem = await this.itemRepository.save(newItem);
    return await this.itemRepository.save(savedItem);
  }
  //update item
  async updateEvent(item_id: string, updatedItem: Item): Promise<Item> {
    const existingItem = await this.findOne(item_id);
    if (!existingItem) {
      throw new NotFoundException(`Item with ID ${item_id} not found.`);
    }
    const mergedItem = this.itemRepository.merge(existingItem, updatedItem);
    return await this.itemRepository.save(mergedItem);
  }
  //delete event
  async deleteEvent(item_id: string): Promise<void> {
    const existingItem = await this.findOne(item_id);
    if (!existingItem) {
      throw new NotFoundException(`Item with ID ${item_id} not found.`);
    }
    await this.itemRepository.remove(existingItem);
  }
}
