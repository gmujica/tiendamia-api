import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './controllers/item/item.controller';
import { ItemService } from './application/item/item.service';


@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [ItemController],
    providers: [ItemService]
})
export class ItemModule {}
