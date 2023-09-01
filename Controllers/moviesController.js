
const Movie = require('./../Models/movieModel')

 


// *********ROUTE HANDLER FUNCTIONS ***********
exports.getAllMovies = async (req, res) => {
    try {

        // const excludeFields = ['sort', 'page', 'limit', 'fields'];

        // const queryObj = {...req.query};

        // excludeFields.forEach((el) => {
        //     delete queryObj[el];
        // })
        // const movies = await Movie.find(queryObj);
        

        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        const queryObj = JSON.parse(queryStr);

        let query = Movie.find();

        //SORTING LOGIC
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy);
            query = query.sort(req.query.sort);
        }else{
            query = query.sort('-createdAt');
        }
 
        //LIMITING FIELDS
        if(req.query.fields){
            // query.select('name description duration price ratings')
            const fields = req.query.fields.split(',').join(' ');
            console.log(fields);
            query = query.select(fields);
        };

        
        const movies = await query;


      //using mongoose special fxns for filtering
        // const movies = await Movie.find()
        //                     .where('duration')
        //                     .gte(req.query.duration)
        //                     .where('ratings')
        //                     .gte(req.query.ratings)
        //                     .where('price')
        //                     .lte(req.query.price);

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
 