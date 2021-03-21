const express=require('express');
const MoviesService=require('../services/movies')

function moviesApi(app) {
    
    const router=express.Router();
    app.use("/api/movies",router);

    const moviesService=new MoviesService();

    router.get("/",async function (req,res,next) {
        const { tags }=req.query;
        try {
            const movies=await moviesService.getMovies();
            res.status(200).json({
                data:movies,
                message:'movies listed'
            });
        } catch (err) {
            next(err);
        }
    });
    router.get("/:movieId",async function (req,res,next) {
        const { movieId }=req.params;
        try {
            const movies=await moviesService.getMovie({ movieId })
            res.status(200).json({
                data:movies,
                message:'movie retrived'
            });
        } catch (err) {
            next(err);
        }
    });
    router.post("/",async function (req,res,next) {
        const {body:movie}=req;
        try {
            const createMovieId=await moviesService.createMovie({movie});
            res.status(201).json({
                data:createMovieId,
                message:'movies created'
            });
        } catch (err) {
            next(err);
        }
    });
    router.put("/:movieId",async function (req,res,next) {
        const {body:movie}=req;
        const { movieId }=req.params;
        try {
           
            const updateMovieId=await moviesService.updateMovie({movieId,movie })
            res.status(200).json({
                data:updateMovieId,
                message:'movies updated'
            });
        } catch (err) {
            next(err);
        }
    });
    router.delete("/:movieId",async function (req,res,next) {
        const { movieId }=req.params;
        try {
            const deleteMovieId=await moviesService.deleteMovie(movieId);
            res.status(200).json({
                data:deleteMovieId,
                message:'movies deleted'
            });
        } catch (err) {
            next(err);
        }
    });
}
module.exports = moviesApi;