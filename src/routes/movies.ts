import express from 'express'

const router = express.Router();

import {Movie, getMovies,getSingleMovies,updateMovies,deleteMovies} from '../controllers/movieController'
import { auth } from '../middleware/auth';

router.post('/create',auth, Movie);
router.get('/read',getMovies)
router.get('/read/:id',getSingleMovies)
router.patch('/update/:id',updateMovies)
router.delete('/delete/:id',deleteMovies)


export default router
