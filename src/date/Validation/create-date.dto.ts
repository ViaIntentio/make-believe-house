import { Transform, Type } from "class-transformer";
import { IsDate, IsEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateDateDto {

    @Type(() => Date)
    @IsDate()
    @Transform(({ value }) => value.toLocaleDateString('pt-BR'))
    dateStart: Date;
    
    @Type(() => Date)
    @IsDate()
    @Transform(({ value }) => value.toLocaleDateString('DD/MM/YYYY'))
    dateEnd: Date;

    @Type(() => Number)
    @IsNumber()
    status: number;

    @IsOptional()
    @IsEmpty()
    totalPrice: number;

}
