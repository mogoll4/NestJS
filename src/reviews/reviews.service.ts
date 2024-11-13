import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Bootcamp } from 'src/bootcamps/entities/bootcamp.entity';

@Injectable()
export class ReviewsService {

  //Inyectar: obtener una instancia del 
  //Repositorio como atributo de 
  //la clase BootcampsService: sin
  //necesidad de instanciar 
  constructor(@InjectRepository(Review) private reviewRepository:Repository<Review>,
              @InjectRepository(Bootcamp) private bootcampRepository:Repository<Bootcamp>,){
        }
 async create(payload: any) {
     //1.desestructurar el dto
     const { title,
      comment,
      rating,
      bootcampId
} = payload
 //2. Hallar el objeto bootcamp
     //que tenga ese id
     const bootcampById =  await this.
                              bootcampRepository.findOneBy({id: bootcampId})
                              return bootcampById;
      //3. crear una instancia de Reviews
      // (Insert)
      const newReviews = new Review()
      newReviews.title = title
      newReviews.comment = comment
      newReviews.rating = rating

      //4. vincular al bootcamp:
      newReviews.bootcamp = bootcampById

      //5 grabar la nueva instancia de curso en bd
      return this.reviewRepository.save(newReviews)

    
  }

  findAll() {
    return this.reviewRepository.find()
  }

  findOne(id: number) {
    return this.reviewRepository.findOneBy({id})
  }

  async update(id: number, payload: any) {
    //1. encontrar el bootcamp por id
    const UpdReview = await this.reviewRepository.findOneBy({id});
    //2. hacer update: agregar cambios del payload 
    //a la entidad hallada en el punto 1 
    this.reviewRepository.merge(UpdReview, payload)
    //3, grabar cambios
    return this.reviewRepository.save(UpdReview)
  }

  async remove(id: number) {
    //Buscar Curso por id
    const delReview = await this.reviewRepository.findOneBy({id});
   // borrar review
   //Borrado
    this.reviewRepository.delete(delReview)
    //3, retonar el bootcap
    //borrado
    return delReview
  }
}
