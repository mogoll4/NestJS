import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar',
            nullable: true
    })
    name: string

    @Column({type: 'varchar',
        nullable: true})
    email: string
    
    @Column({type: 'enum',
            enum: ["Usuario", 
                    "Editor", 
                    "Administrador"],  
        nullable: true})
    role: string

    @Column({type: 'varchar',
        nullable: true})
    password: string

}
