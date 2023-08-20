// IMPORT PACKAGE
const fs = require ('fs');
const express = require ('express');

let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

// ROUTE = HTTP METHOD + URL

app.get('/api/v1/movies', (req, res) => {
    res.status(200).json({
        //jsend json formatting 
        status: "success",
        count: movies.length,
        data: {
            movies: movies
        }
    });
})




// CREATE A SERVER
const port = 3000;
app.listen(port, ()=> {
    console.log('server has started...')
});


