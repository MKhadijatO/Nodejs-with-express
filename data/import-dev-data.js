const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fs = require('fs')
const Movie = require('./../Models/movieModel')


dotenv.config({path: './config.env'});


//CONNECT TO MONGODB
mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    console.log('DB connection successful');
}).catch((error) => {
    console.log('Some error occurred');
}); 

//READ MOVIES.JSON FILE
const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));


//DELETE EXISTING DOCS
const deleteMovies = async ()=> {
    try{
        await Movie.deleteMany();
        console.log('Data deleted')
    }catch(err){
        console.log(err.message)
    }
    process.exit();
}

//IMPORT MOVIES DATA TO MONGODB COLLECTON

const importMovies = async ()=> {
    try{
        await Movie.create(movies);
        console.log('Data imported')
    }catch(err){
        console.log(err.message)
    }

    process.exit();

}

// deleteMovies();
// importMovies();

// console.log(process.argv);

if(process.argv[2] === '--import'){
    importMovies();
}

if(process.argv[2] === '--delete'){
    deleteMovies();
}