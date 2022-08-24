import express from 'express'
import { getMovies } from '../controllers/movieController';
const router = express.Router();
// import {RegisterUser, LoginUser, getuser} from '../controllers/userController'
router.get('/', getMovies)




export default router;
