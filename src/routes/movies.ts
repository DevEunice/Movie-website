import express from 'express'

const router = express.Router();

import {Movie, getMovies,getSingleMovies,updateMovies,deleteMovies} from '../controllers/movieController'
import { auth } from '../middleware/auth';

router.get('/create',(req,res)=>{
    res.render('create')
})

router.post('/create',auth, Movie);
router.get('/read',getMovies)

//router.get('/read/:id',getSingleMovies)
router.get('/edit/:id',async (req,res,next)=>{
    let record = await getSingleMovies(req, res, next)
    res.render('edit', {record})
})
router.post('/edit/:id',auth,updateMovies)
router.post('/delete/:id', auth, deleteMovies)


export default router
