import { Bootcamp } from 'src/bootcamps/entities/bootcamp.entity';
import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';


@Injectable()
export class CoursesService {
  
  //Inyectar: obtener una instancia del 
  //Repositorio como atributo de 
  //la clase BootcampsService: sin
  //necesidad de instanciar 
  constructor(@InjectRepository(Course) private cursoRepository:Repository<Course>,
              @InjectRepository(Bootcamp) private BootcampRepository:Repository<Bootcamp>){
        }


  async create(payload: CreateCourseDto) {
    //1.desestructurar el dto
    const { title,
            weeks,
            tuition,
            minimumSkill,
            createdAt,
            BootcampId
     } = payload
     //2. Hallar el objeto bootcamp
     //que tenga ese id
     const bootcampById = await this.
                              BootcampRepository.findOneBy({id: BootcampId})
                              return bootcampById;
    
      //3. crear una instancia de Course
      // (Insert)
      const newCurso = new Course()
      newCurso.title = title
      newCurso.weeks = weeks
      newCurso.tuition = tuition
      newCurso.minimumSkill = minimumSkill
      newCurso.createdAt = createdAt

      //4. vincular al bootcamp:
      newCurso.bootcamp = bootcampById

      //5 grabar la nueva instancia de curso en bd
      return this.
             cursoRepository.save(newCurso  )
  }

  findAll() {
    return this.cursoRepository.find()
  }

  findOne(id: number) {
    return this.cursoRepository.findOneBy({id: id})
  }



  async update(id: number, body: UpdateCourseDto) {
    //1. encontrar el bootcamp por id
    const UpdCurso = await this.cursoRepository.findOneBy({id});
    //2. hacer update: agregar cambios del payload 
    //a la entidad hallada en el punto 1 
    this.cursoRepository.merge(UpdCurso, body)
    //3, grabar cambios
    return this.cursoRepository.save(UpdCurso)
  }

  async remove(id: number) {
    //Buscar Curso por id
    const delCurso = await this.cursoRepository.findOneBy({id});
   // borrar Curso
   //Borrado
    this.cursoRepository.delete(delCurso)
    //3, retonar el bootcap
    //borrado
    return delCurso
  }
}
