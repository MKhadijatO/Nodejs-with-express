const fs = require ('fs');

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));


// *********ROUTE HANDLER FUNCTIONS ***********
exports.getAllMovies = (req, res) => {
    res.status(200).json({
        //jsend json formatting 
        status: "success",
        requestedAt: req.requestedAt,
        count: movies.length,
        data: {
            movie: movies
        }
    });
}

exports.getMovie = (req, res) => {
   
    //CONVERT ID TO NUMBER TYPE
    const id  = req.params.id * 1;
    
    // FIND MOVIE BASED ON ID PARAMETER
    let movie = movies.find(el => el.id === id)


    res.status(200).json({
        status: "success",
        data: {
            movie: movie
    }
    });
}


exports.createMovie = (req, res) => {
    //console.log(req.body);
    const newId = movies[movies.length -1].id + 1;

    const newMovie = Object.assign({id:newId}, req.body)
    movies.push(newMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                movie: movies
            }
        })
    });
    // res.send('Created');
}

exports.updateMovie = (req, res) => {
    let id  = req.params.id * 1;
    let movieToUpdate = movies.find(el => el.id === id);
    if (!movieToUpdate){
        return res.status(404).json({
            status: 'failed',
            message: 'Movie with ID ' +id+ ' not found'
        })
    }

    let index = movies.indexOf(movieToUpdate); //if id =7, index = 6

    Object.assign(movieToUpdate, req.body);

    movies[index] = movieToUpdate;

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: "success",
            data: {
                movie: movieToUpdate
            }
        })
    })

}

exports.deleteMovie = (req, res) => {
    const id = req.params.id * 1;
    const movieToDelete = movies.find(el => el.id === id);

    
    if (!movieToDelete){
        return res.status(404).json({
            status: 'failed',
            message: 'No movie with ID ' + id + ' was found'
        })
    }

    const index = movies.indexOf(movieToDelete);

    movies.splice(index, 1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: "success",
            data: {
                movie: null
                
            }
        })
    })

}
 