import { PrismaService } from "src/prisma/prisma.service";
import { CreateDateDto } from "../Validation/create-date.dto";
import { UpdateDateDto } from "../Validation/update-date.dto";

export class Date extends PrismaService{

    CreateDate(data : CreateDateDto){
        return this.date.create({
            data,
        })
    }

    GetAllDate(){
        return this.date.findMany();
    }

    GetDateById(id: string){
        return this.date.findUnique({
            where:{
                id: id,
            }
        })
    }

    UpdateDate(id: string, data: UpdateDateDto){
        return this.date.update({
            where:{
                id: id,
            },
            data,
        })
    }

    DeleteDate(id: string){
        return this.date.delete({
            where:{
                id: id,
            }
        })
    }

}
