// IMPORT PACKAGE
const fs = require ('fs');
const express = require ('express');

let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

app.use(express.json());

// GET REQUEST - api/v1/movies

app.get('/api/v1/movies', (req, res) => {
    res.status(200).json({
        //jsend json formatting 
        status: "success",
        count: movies.length,
        data: {
            movie: movies
        }
    });
})

// GET REQUEST - api/v1/movies/id

app.get('/api/v1/movies/:id', (req, res) => {
    console.log(req.params);

    res.send('Test movie')
})





//POST REQUEST - api/v1/movies

app.post('/api/v1/movies', (req, res) => {
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
});




// CREATE A SERVER
const port = 3000;
app.listen(port, ()=> {
    console.log('server has started...')
});


