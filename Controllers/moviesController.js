// const {param} = require('../Routes/moviesRoutes');
const Movie = require('./../Models/movieModel');
const ApiFeatures = require('./../Utilities/ApiFeatures.js');



exports.getHighestRated = async (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratings';

    next(); 
}

// *********ROUTE HANDLER FUNCTIONS ***********
exports.getAllMovies = async (req, res) => {
    try {
        const features = new ApiFeatures(Movie.find(), req.query).filter().sort().limitFields().paginate();
        let movies = await features.query;
        
        res.status(200).json({
            status: 'success',
            length: movies.length,
            data: {
                movies
                }       
         });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    
        
    }
    
}

exports.getMovie = async (req, res) => {
    try{
        //const movie = await Movie.find({_id: req.params.id});
        const movie = await Movie.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                movie
                }       
        });
    }catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    
        
    }
    
}


exports.createMovie = async (req, res) => {
    // const testMovie = new Movie({});
    // testMovie.save();
    try{
        const movie = await Movie.create(req.body); 
        
        res.status(201).json({
            status: 'success',
            data: {
                movie
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'error',
            message: err.message
        })  

    }

}

exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        
        res.status(200).json({
            status: 'success',
            data: {
                movie: updatedMovie
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        }); 
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
        
    } catch (err) {
        res.status(404).json({
            status: 'error',
            message: err.message
        });
        
    }
}
 


exports.getMovieStats = async (req, res) => {
    try {
        const stats = await Movie.aggregate([
            { $match: {ratings:{$gte: 5}}},
            { $group: {
                _id: null,
                avgRating: {$avg: '$ratings'},
                avgPrice: {$avg: '$price'},
                minPrice: {$min: '$price'},
                maxPrice: {$max: '$price'},
                priceTotal:{$sum: '$price'},
                movieCount: {$sum: 1},
            }}
        ]);

        res.status(200).json({
            status: 'success',
            count: stats.length,
            data: {
                stats
            }
        });

    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        });
    }
}