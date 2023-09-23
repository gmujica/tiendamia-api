import { IsString, IsArray, IsDateString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  status: string;

  @IsString()
  client: string;

  @IsString()
  shipping_address: string;

  @IsDateString()
  shipping_promise: Date;

  @IsArray()
  itemIds: string[];
}
