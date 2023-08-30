const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

//console.log(app.get('env'));
console.log(process.env);

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    //console.log(conn);
    console.log('DB connection successful');
}).catch((error) => {
    console.log('Some error occurred');
}); 


const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    description: String,
    duration: {
        type: Number,
        required: [true, 'Duration is required']
    },
    rating: {
        type: Number,
        default: 1.0
    }
});

const Movie = mongoose.model('Movie', movieSchema);
 
const testMovie = new Movie ({
    name:"Avatar",
    description: "adventures of avatar Ang",
    duration: 120,
    rating: 4
}); 

 testMovie.save()
 .then((doc) => {
    console.log(doc);
 }) 
 .catch(err => {
    console.log("Error: " + err);
 });;

// CREATE A SERVER

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server has started...');
})