import {Request,Response, NextFunction} from 'express'
import {v4 as uuidv4} from 'uuid'
import {MovieInstance } from '../model/movie'
import { UserInstance } from '../model/user'
import {createMovieSchema,options,updateMovieSchema} from '../utils/utils'


export async function Movie(req:Request | any, res:Response, next:NextFunction) {
   const id = uuidv4()
   // let todo = {...req.body, id}
   try{ 
      const verified = req.user
       const validationResult = createMovieSchema.validate(req.body,options)
       if( validationResult.error){
          return res.status(400).json({
             Error:validationResult.error.details[0].message
          })
       }
     
       
       
      const record = await MovieInstance.create({id, ...req.body, userId: verified.id})
   //   return res.status(201).json({
   //        msg:"You have successfully created a movie",
   //        record
   //    })
   res.redirect('/users/dashboard')

   // const user = await UserInstance.findOne({
   //    where: {id: verified.id},
   //    include: [{ model: MovieInstance, as: "movies"}]
   // })
   
   //res.redirect("/users/dashboard")

   }catch(err){
      console.log(err);
      
      res.status(500).json({
       msg:'failed to create',
       route:'/create'
      })
   }

}

export async function getMovies(req:Request, res:Response, next:NextFunction) {
    try{ 
       const limit = req.query?.limit as number | undefined
       const offset = req.query?.offset as number | undefined
      //  const record = await TodoInstance.findAll({where: {},limit, offset})
       const record = await MovieInstance.findAndCountAll({limit, offset, include:[{
         model:UserInstance,
         attributes:['id','fullname','username','email'],
         as:'users'
        }]
   });
   const eunice = req.headers['postman']
   if(eunice){
      res.status(200).json({
         msg:"You have successfully fetch all movies",
         count:record.count,
         record:record.rows 
   })
 }else{
   res.render("index", {value: record.rows})
   
}
   
       
}catch(error){
   console.log(error);
   
     res.status(500).json({
        msg:"failed to read",
        route:"/read"
     })
}

}


export async function getSingleMovies(req:Request, res:Response, next:NextFunction) {
   try{ 
    const  {id} = req.params
   const record = await MovieInstance.findOne({where: {id}})
   // return res.status(200).json({
   //    msg:"Successfully gotten user information",
   //    record:record
   // })

   return record

}catch(error){
    res.status(500).json({
       msg:"failed to read single movie",
       route:"/read/:id"
    })
}

}

export async function updateMovies(req:Request, res:Response, next:NextFunction) {
   try{ 
      const  {id} = req.params
      const {title, description,image, price} = req.body
      const validationResult = updateMovieSchema.validate(req.body,options)
       if( validationResult.error){
          return res.status(400).json({
             Error:validationResult.error.details[0].message
          })
       } 

      const record = await MovieInstance.findOne({where: {id}})
       if(!record){
         return res.status(404).json({
            Error:"Cannot find existing movie",
         })
       }
       const updatedrecord = await record.update({
          title:title,
          description:description,
          image:image,
          price:price
       })
       res.redirect('/users/dashboard')

      //   res.status(200).json({
      //     msg:"You have successfully updated your movie",
      //     updatedrecord
      //  })

}catch(error){
    res.status(500).json({
       msg:"failed to update",
       route:"/update/:id"
    })
}

}
export async function deleteMovies(req:Request, res:Response, next:NextFunction) {
   try{ 
      const  {id} = req.params
      const record = await MovieInstance.findOne({where: {id}})
      if(!record){
         return res.status(404).json({
            msg:"Cannot find movie"
         })
      }
      const deletedRecord = await record.destroy()
      // return res.status(200).json({
      //    msg: "Movie deleted successfully",
      //    deletedRecord 
      // })

      res.redirect('/users/dashboard')
}catch(error){
    res.status(500).json({
       msg:"failed to delete",
       route:"/delete/:id"
    })
}

}


