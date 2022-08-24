import express from 'express'
const router = express.Router();
import {RegisterUser, LoginUser, getuser, getUniqueUserMovie} from '../controllers/userController'

router.get('/register',(req, res)=>{
    res.render("registration")
})
router.post('/register',RegisterUser)

router.get('/login',(req, res)=>{
    res.render("login")
})

router.get('/dashboard', getUniqueUserMovie)

router.post('/login',LoginUser)
router.get('/allusers', getuser)


export default router
