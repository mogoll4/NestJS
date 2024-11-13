import { Bootcamp } from 'src/bootcamps/entities/bootcamp.entity';
import { IsEnum, IsInt, IsNotEmpty, IsIn, IsDecimal, IsDate, Matches  } from "class-validator";

enum minimumSkill {
    'Beginner',
    'Intermediate',
    'Advanced'
}

export class CreateCourseDto {

    @IsNotEmpty({message: "No debe estar vacio"})
    @IsEnum(minimumSkill)
    readonly minimumSkill: minimumSkill

    @IsNotEmpty({message: "No debe estar vacio"})
    @IsInt()
    @IsIn([4, 8])
    weeks: number

    @IsNotEmpty({message: "No debe estar vacio"})
    title: string

    @IsNotEmpty({message: "No debe estar vacio"})
    tuition: number

    @IsNotEmpty({message: "No debe estar vacio"})
    @Matches(/^(\d{4})-(\d{2})-(\d{2})$/, {message: "CreatedAt debe ser una fecha"})
    createdAt: Date

     /** *
     * Clave FORANEA con el bootcamp**/
     @IsInt()
     readonly BootcampId: number


}
