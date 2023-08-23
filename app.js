// IMPORT PACKAGE
const fs = require ('fs');
const express = require ('express');
const morgan = require('morgan');

let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));


const logger = function(req, res, next) {
    console.log ('Custom middleware called'); 
    next();
}

app.use(express.json());
app.use(morgan('tiny'));
app.use(logger);
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});



// *********ROUTE HANDLER FUNCTIONS ***********
const getAllMovies = (req, res) => {
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

const getMovie = (req, res) => {
   
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


const createMovie = (req, res) => {
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

const updateMovie = (req, res) => {
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

const deleteMovie = (req, res) => {
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


// ********* APIs ********
// app.get('/api/v1/movies', getAllMovies);
// app.get('/api/v1/movies/:id', getMovie);
// app.post('/api/v1/movies', createMovie);
// app.patch('/api/v1/movies/:id', updateMovie);
// app.delete('/api/v1/movies/:id', deleteMovie)


const moviesRouter = express.Router();

moviesRouter.route('/')
    .get(getAllMovies)
    .post(createMovie)

moviesRouter.route('/:id')
    .get(getMovie)
    .patch(updateMovie)
    .delete(deleteMovie)

app.use('/api/v1/movies', moviesRoter)



// CREATE A SERVER
const port = 3000;
app.listen(port, ()=> {
    console.log('server has started...')
});


