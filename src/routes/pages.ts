import express from 'express'
import { getMovies } from '../controllers/movieController';
const router = express.Router();
// import {RegisterUser, LoginUser, getuser} from '../controllers/userController'
router.get('/', getMovies)

router.get('/registration',(req, res)=>{
    res.render("registration")
})


export default router;
