
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
        
        res.status(201).json({
            status: 'success',
            data: {
                movie: updatedMovie
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        }) 
    }



}

exports.deleteMovie = (req, res) => {
    
}
 