import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ItemService } from 'src/item/application/item/item.service';
import { Item } from 'src/item/infrastructure/entity/item.entiy';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  //get all items
  @Get()
  @ApiTags('items')
  @ApiOperation({ summary: 'Get All Items' })
  async findAll(): Promise<Item[]> {
    return await this.itemService.findAll();
  }
  //get one item
  @Get(':id')
  @ApiTags('items')
  @ApiOperation({ summary: 'Get one item by ID' })
  async findOne(@Param('id') item_id: string): Promise<Item | null> {
    const item = await this.itemService.findOne(item_id);
    return item ? item : null;
  }
  @Post()
  @ApiTags('items')
  @ApiOperation({ summary: 'Create new item' })
  @ApiBody({
    type: Item,
    description: 'Create Item',
    examples: {
      item: {
        summary: 'Create Item',
        description: 'Create Item',
        value: {
          title: 'Item x',
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
          price: '34.99',
          quantity: 36,
        },
      },
    },
  })
  async create(@Body() item: Item): Promise<Item> {
    return await this.itemService.create(item);
  }
  // update event by ID
  @Put(':id')
  @ApiTags('items')
  @ApiOperation({ summary: 'Update an existing item by ID' })
  @ApiBody({
    type: Item,
    description: 'Create Item',
    examples: {
      item: {
        summary: 'Create Item',
        description: 'Create Item',
        value: {
          title: 'Item x',
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
          price: '34.99',
          quantity: 36,
        },
      },
    },
  })
  async update(
    @Param('id') item_id: string,
    @Body() updatedItem: Item,
  ): Promise<Item | NotFoundException> {
    try {
      return await this.itemService.updateEvent(item_id, updatedItem);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Item with ID ${item_id} not found.`);
    }
  }
  // delete event by ID
  @Delete(':id')
  @ApiTags('items')
  @ApiOperation({ summary: 'Delete an existing item by ID' })
  async remove(
    @Param('id') item_id: string,
  ): Promise<void | NotFoundException> {
    try {
      await this.itemService.deleteEvent(item_id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Item with ID ${item_id} not found.`);
    }
  }
}
