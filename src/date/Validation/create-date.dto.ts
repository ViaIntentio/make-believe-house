import { Type } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

export class CreateDateDto {

    @IsDate()
    dateStart: Date;
    
    @IsDate()
    dateEnd: Date;

    @Type(() => Number)
    @IsNumber()
    status: number;

    @Type(() => Number)
    @IsNumber()
    totalPrice: number;

}
