import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from 'src/orders/application/orders/orders.service';
import { Orders } from 'src/orders/infrastructure/entity/orders.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  //get all events
  @Get()
  @ApiTags('Orders')
  @ApiOperation({ summary: 'Get All Orders' })
  async findAll(): Promise<Orders[]> {
    return await this.orderService.findAll();
  }

  //get one order
  @Get(':id')
  @ApiTags('Orders')
  @ApiOperation({ summary: 'Get one order by ID' })
  async findOne(@Param('id') order_id: string): Promise<Orders | null> {
    const order = await this.orderService.findOnebyId(order_id);
    return order ? order : null;
  }
  // Create a new order and associate it with items
  @Post()
  @ApiOperation({ summary: 'Create a new order and associate it with items' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: Orders,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiTags('Orders')
  @ApiBody({
    type: Orders,
    description: 'Create new Order',
    examples: {
      item: {
        summary: 'Create new Order',
        description: 'Create new Order',
        value: {
          status: 'Approve',
          client: 'client name',
          shipping_address: '123 Main St, City, Country',
          shipping_promis: '2023-09-25 14:00:00',
          itemIds: [
            '079d8c23-335e-4571-b6c3-499dd9f4806c',
            '77adf013-f699-4046-9244-a1109dc7b773',
          ],
        },
      },
    },
  })
  async createOrder(
    @Body() orderData: Partial<Orders>,
    @Body('itemIds') itemIds: string[],
  ): Promise<Orders> {
    return await this.orderService.createOrder(orderData, itemIds);
  }
  // Update an existing order by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update an existing order by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
    type: Orders,
  })
  @ApiTags('Orders')
  @ApiBody({
    type: Orders,
    description: 'Update Order',
    examples: {
      item: {
        summary: 'Update Order',
        description: 'Update Order',
        value: {
          // Include the fields you want to update here
          status: 'Updated Status',
          client: 'Updated Client Name',
          // Other fields as needed
        },
      },
    },
  })
  async updateOrder(
    @Param('id') order_id: string,
    @Body() updatedOrder: Partial<Orders>,
  ): Promise<Orders> {
    return await this.orderService.updateOrder(order_id, updatedOrder);
  }
  // Delete an existing order by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existing order by ID' })
  @ApiResponse({
    status: 204,
    description: 'The order has been successfully deleted.',
  })
  @ApiTags('Orders')
  async deleteOrder(@Param('id') order_id: string): Promise<void> {
    await this.orderService.deleteOrder(order_id);
  }
}
