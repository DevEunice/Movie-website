import express from 'express'
const router = express.Router();
import {RegisterUser, LoginUser, getuser} from '../controllers/userController'

router.post('/register',RegisterUser)
router.post('/login',LoginUser)
router.get('/allusers', getuser)


export default router
