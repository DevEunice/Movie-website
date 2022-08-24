import express,{Request,Response,NextFunction}
 from 'express'
 import {v4 as uuidv4} from 'uuid'
 import {registerSchema,options,loginSchema,generateToken} from '../utils/utils'
 import {UserInstance } from '../model/user'
 import bcrypt from 'bcryptjs'
 import {MovieInstance} from "../model/movie"
import { request } from 'http'

 export async function RegisterUser(req:Request, res:Response, next:NextFunction) {
    const id = uuidv4()
    try{ 
       const validationResult = registerSchema.validate(req.body,options)
       if( validationResult.error){
          return res.status(400).json({
             Error:validationResult.error.details[0].message,
            })
           
         }
         const duplicatEmail = await UserInstance.findOne({where:{email:req.body.email}})
         if(duplicatEmail){
            return res.status(409).json({
               msg:"Email is used, please change email"
            })
         }
               const passwordHash = await bcrypt.hash(req.body.password,8)
               const record = await UserInstance.create({ 
                  id:id,
                  fullname:req.body.fullname,
                  username:req.body.username,
                  email:req.body.email,
                  password:passwordHash
               })
               res.status(201).json({
                  msg:"You have successfully created a user",
                  record
               })
            }catch(err){
               console.log(err)
               res.status(500).json({
                  msg:'failed to register',
                  route:'/register'
               })
            }
            
         }
         
         
         export async function LoginUser(req:Request, res:Response, next:NextFunction) {
            const id = uuidv4()
            try{ 
               const validationResult = loginSchema.validate(req.body,options)
               if( validationResult.error){
                  return res.status(400).json({
                     Error:validationResult.error.details[0].message
                  })
               }
               const User = await UserInstance.findOne({where:{email:req.body.email}}) as unknown as {[key:string]:string}
               
               const {id} =User
               const token = generateToken({id})
               const validUser = await bcrypt.compare(req.body.password, User.password);
               
               if(!validUser){
                  res.status(401).json({
                     message:"Password do not match"
                  })
               }else{
                  res.cookie("token", token,{
                     httpOnly: true,
                     maxAge: 1000 * 60 * 60 * 24,
                  })
                  res.cookie("id", id,{
                     httpOnly: true,
                     maxAge: 1000 * 60 * 60 * 24,
                  })
                  
                  res.redirect("/users/dashboard")
               }

              
            
               
            }catch(err){
               res.status(500).json({
                  msg:'failed to login',
                  route:'/login'
               })
            }
            
         }
         
         export async function getuser(req:Request, res:Response, next:NextFunction) {
            try{ 
               const limit = req.query?.limit as number | undefined
               const offset = req.query?.offset as number | undefined
               console.log("before")
               //  const record = await TodoInstance.findAll({where: {},limit, offset})
               const record = await UserInstance.findAndCountAll({limit, offset, include:[{
                  model:MovieInstance, as:"movies"
               }]})
               console.log("after")
      res.status(200).json({
         msg:"You have successfully fetch all movies",
         count:record.count,
         record:record.rows
      })
}catch(error){
    res.status(500).json({
       msg:"failed to read",
       route:"/read"
    })
}

}

export async function getUniqueUserMovie(req:Request, res: Response, next: NextFunction){
   let id = req.cookies.id
   try {
      const record = await UserInstance.findOne({
         where:{id}, include: [{
            model: MovieInstance,
            as: "movies"
         }]
      });
      res.render("dashboard", {record})
   } catch (error) {
      res.status(500).json({
         msg: "failed to read",
         route:"/read"
      })
   }
}