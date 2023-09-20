import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './controllers/item/item.controller';
import { ItemService } from './application/item/item.service';
import { Item } from './infrastructure/entity/item.entiy';


@Module({
    imports: [TypeOrmModule.forFeature([Item])],
    controllers: [ItemController],
    providers: [ItemService]
})
export class ItemModule {}
