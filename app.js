// IMPORT PACKAGE

const express = require('express');
const morgan = require('morgan');
const moviesRouter = require('./Routes/moviesRoutes');


let app = express();
const logger = function(req, res, next) {
    console.log ('Custom middleware called'); 
    next();
}


//middleware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.static('./public'));
app.use(logger);
app.use((req, res, next) => { 
    req.requestedAt = new Date().toISOString();
    next();
});
 


// USING ROUTES
app.use('/api/v1/movies', moviesRouter)

app.all('*', (req, res, next) => {
    res.status(404).json({
        status:'fail',
        message:`Can't find ${req.originalUrl} on the server`
    });
})


module.exports = app;
 

// EP 40
//INSTALLING MONGODB AND MONGODB SHELL
//INTRODUCTION TO MONGODB