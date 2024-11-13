import { IsAlpha, IsDate, IsInt, IsNotEmpty, IsPositive, Max, Min, Matches } from 'class-validator'

export class CreateBootcampDto {

    @IsNotEmpty({message: "nombre No debe estar vacio"})
    readonly name: string;
    @IsInt({message: "telefono No debe ser un numero"})
    readonly phone: string;
    @IsNotEmpty( {message: "direccion No debe estar vacio"})
    readonly addres: string;
    @IsNotEmpty( {message: "topics No debe estar vacio"})
    readonly topics: string;
    @IsNotEmpty( {message: "calificacion No debe estar vacio"})
    @IsPositive()
    @Min(1)
    @Max(10)
    readonly averageRating: number;


    @IsNotEmpty({message: "fecha No debe estar vacio"})
    //Se agrego El @Matches junto son su importacion 
    //y se elimino la validacion de @IsDate 
    readonly createdAt: Date;

   

}
