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
import { ItemService } from '../../application/item/item.service';
import { Item } from '../../infrastructure/entity/item.entiy';

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
}
