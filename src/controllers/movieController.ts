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
       console.log(verified);
       console.log(id);
       
       
      const record = await MovieInstance.create({...req.body, id, userId:verified.id})
     return res.status(201).json({
          msg:"You have successfully created a todo",
          record
      })
   

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
   res.render("index", {value: record.rows})
       res.status(200).json({
          msg:"You have successfully fetch all todos",
          count:record.count,
          record:record.rows
       })
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
   return res.status(200).json({
      msg:"Successfully gotten user information",
      record
   })

}catch(error){
    res.status(500).json({
       msg:"failed to read single todo",
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
            Error:"Cannot find existing todo",
         })
       }
       const updatedrecord = await record.update({
          title:title,
          description:description,
          image:image,
          price:price
       })
       res.status(200).json({
          msg:"You have successfully updated your todo",
          updatedrecord
       })
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
            msg:"Cannot find todo"
         })
      }
      const deletedRecord = await record.destroy()
      return res.status(200).json({
         msg: "Todo deleted successfully",
         deletedRecord 
      })
}catch(error){
    res.status(500).json({
       msg:"failed to delete",
       route:"/delete/:id"
    })
}

}


