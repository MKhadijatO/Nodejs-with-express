// IMPORT PACKAGE

const express = require('express');
const morgan = require('morgan');

const moviesRouter = require('./Routes/moviesRoutes');


let app = express();


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






// ********* APIs ********
// app.get('/api/v1/movies', getAllMovies);
// app.get('/api/v1/movies/:id', getMovie);
// app.post('/api/v1/movies', createMovie);
// app.patch('/api/v1/movies/:id', updateMovie);
// app.delete('/api/v1/movies/:id', deleteMovie)



app.use('/api/v1/movies', moviesRouter)



// CREATE A SERVER
const port = 3000;
app.listen(port, ()=> {
    console.log('server has started...')
});


