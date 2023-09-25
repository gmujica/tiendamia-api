import { Item } from '../entity/item.entiy';
export class ItemRepositoryMock {
  private items: Item[] = [];

  async find(): Promise<Item[]> {
    return this.items;
  }

  async findOne(item_id: string): Promise<Item | undefined> {
    return this.items.find((item) => item.item_id === item_id);
  }

  async create(itemData: Partial<Item>): Promise<Item> {
    const item = new Item();
    Object.assign(item, itemData);
    this.items.push(item);
    return item;
  }

  async save(item: Item): Promise<Item> {
    const existingItem = this.items.find((i) => i.item_id === item.item_id);
    if (existingItem) {
      // Update the existing item
      Object.assign(existingItem, item);
    } else {
      // Item doesn't exist, create a new one
      this.items.push(item);
    }
    return item;
  }

  async remove(item: Item): Promise<void> {
    const index = this.items.findIndex((i) => i.item_id === item.item_id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
