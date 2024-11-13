import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  
  //Inyectar: obtener una instancia del 
  //Repositorio como atributo de 
  //la clase BootcampsService: sin
  //necesidad de instanciar 
  constructor(@InjectRepository(User) 
        private usuarioRepository:
                Repository<User> ){
        }
  create(payload : any) {
   const newusuario = this.usuarioRepository.create(payload)
   return this.usuarioRepository.save(newusuario)
  }

  findAll() {
    return this.usuarioRepository.find()
  }

  findOne(id: number) {
    return this.usuarioRepository.findOneBy({id})
  }

  async update(id: number, payload: any) {
    //1. encontrar el usuario por id
    const UpdUsuario = await this.usuarioRepository.findOneBy({id});
    //2. hacer update: agregar cambios del payload 
    //a la entidad hallada en el punto 1 
    this.usuarioRepository.merge(UpdUsuario, payload)
    //3, grabar cambios
    return this.usuarioRepository.save(UpdUsuario)
  }

  async remove(id: number) {
    //Buscar Curso por id
    const delUsuario = await this.usuarioRepository.findOneBy({id});
   // borrar usuario
   //Borrado
    this.usuarioRepository.delete(delUsuario)
    //3, retonar el bootcap
    //borrado
    return delUsuario
  }
}
