import { IsString, IsNotEmpty, IsArray, IsDate } from 'class-validator';
import { ItemDto } from '../../../item/infrastructure/dto/item.dto';

export class OrdersDto {
    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsString()
    client: string;

    @IsNotEmpty()
    @IsString()
    shipping_address: string;

    @IsNotEmpty()
    @IsDate()
    shipping_promise: Date;

    @IsArray()
    items: ItemDto[];
}
