import { PrismaService } from "src/prisma/prisma.service";
import { CreateDateDto } from "../Validation/create-date.dto";

export class Date extends PrismaService{

    CreateDate(data : CreateDateDto){
        return this.date.create({
            data,
        })
    }

    ReadDate(){
        return this.date.findMany();
    }

    ReadDateById(id: string){
        return this.date.findUnique({
            where:{
                id: id,
            }
        })
    }

    UpdateDate(id: string, data: CreateDateDto){
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
