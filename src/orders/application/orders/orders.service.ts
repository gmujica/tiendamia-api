import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/item/infrastructure/entity/item.entiy';
import { Orders } from 'src/orders/infrastructure/entity/orders.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}
  //get all orders
  async findAll(): Promise<Orders[]> {
    return await this.orderRepository.find();
  }
  // Create a new order
  async createOrder(
    orderData: Partial<Orders>,
    itemIds: string[],
  ): Promise<Orders> {
    const newOrder = this.orderRepository.create(orderData);
    const itemsToAssociate = await this.itemRepository.findByIds(itemIds);

    newOrder.items = itemsToAssociate;

    const savedOrder = await this.orderRepository.save(newOrder);

    return savedOrder;
  }
  async findOnebyId(order_id: string): Promise<any> {
    const order = await this.orderRepository.findOne({
      where: { order_id },
      relations: ['items'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${order_id} not found`);
    }
    const formattedOrder = {
      status: order.status,
      client: order.client,
      shipping_address: order.shipping_address,
      shipping_promise: order.shipping_promise.toISOString(),
      items: order.items.map((item) => ({
        item_id: item.item_id,
        title: item.title,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        created_at: item.created_at.toISOString(),
        updated_at: item.updated_at.toISOString(),
      })),
      order_id: order.order_id,
      created_date: order.created_date.toISOString(),
    };
    return formattedOrder;
  }
  // Update an existing order by ID
  async updateOrder(
    order_id: string,
    updatedOrder: Partial<Orders>,
  ): Promise<Orders> {
    const existingOrder = await this.findOnebyId(order_id);

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${order_id} not found.`);
    }

    const mergedOrder = this.orderRepository.merge(existingOrder, updatedOrder);

    const savedOrder = await this.orderRepository.save(mergedOrder);

    return savedOrder;
  }
  // Delete an order by ID
  async deleteOrder(order_id: string): Promise<void> {
    const existingOrder = await this.findOnebyId(order_id);

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${order_id} not found.`);
    }

    // Delete the order
    await this.orderRepository.remove(existingOrder);
  }
}
