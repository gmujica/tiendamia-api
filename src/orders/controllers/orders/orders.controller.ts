import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from 'src/orders/application/orders/orders.service';
import { Orders } from 'src/orders/infrastructure/entity/orders.entity';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    //get all events
    @Get()
    @ApiTags('Orders')
    async findAll(): Promise<Orders[]> {
        return await this.orderService.findAll();
    }

    //get one event
    @Get(':id')
    @ApiTags('Orders')
    async findOne(@Param('id') order_id: string): Promise<Orders | null> {
        const order = await this.orderService.findOnebyId(order_id);
        return order ? order : null;
    }
    // Create a new order and associate it with items
    @Post()
    @ApiTags('Orders')
    async createOrder(@Body() orderData: Partial<Orders>, @Body('itemIds') itemIds: string[]): Promise<Orders> {
        return await this.orderService.createOrder(orderData, itemIds);
    }
}
