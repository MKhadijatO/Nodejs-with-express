// IMPORT PACKAGE
const fs = require ('fs');
const express = require ('express');

let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

app.use(express.json());

// *********ROUTE HANDLER FUNCTIONS ***********
const getAllMovies = (req, res) => {
    res.status(200).json({
        //jsend json formatting 
        status: "success",
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
            message: 'No movie with ID ' + id + ' is not found'
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
// GET REQUEST - api/v1/movies

app.get('/api/v1/movies', getAllMovies)

// GET REQUEST - api/v1/movies/id

app.get('/api/v1/movies/:id', getMovie)

//POST REQUEST - api/v1/movies

app.post('/api/v1/movies', createMovie);


// PATCH REQUEST (UPDATE RESOURCE)
app.patch('/api/v1/movies/:id', updateMovie);

//DELETE DATA
app.delete('api/v1/movies/:id', deleteMovie)





// CREATE A SERVER
const port = 3000;
app.listen(port, ()=> {
    console.log('server has started...')
});


