
const Movie = require('./../Models/movieModel')

 


// *********ROUTE HANDLER FUNCTIONS ***********
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({
            status: 'success',
            length: movies.length,
            data: {
                 movies
                }       
         });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    
        
    }
    
}

exports.getMovie = async (req, res) => {
    
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

exports.updateMovie = (req, res) => {
    }

exports.deleteMovie = (req, res) => {
    
}
 