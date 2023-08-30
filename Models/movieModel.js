const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required']
    },
    ratings: {
        type: Number,
    },
    totalRating:{
        type: Number,
    },
    releaseYear: {
        type: Number,
        required: [true, 'Release year is required']
    },
    releaseDate:{
        type: Date,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    genre: {
        type: [String],
        required: [true, 'Genres is required']
    }, 
    directors: {
        type: [String],
        required: [true, 'Directors is required']
    },
    coverImage: {
        type: String,
        require: [true, 'Cover image is required']
    },
    actors: {
        type: [String],
        required: [true, 'actors is required']
    },
    price: {
        type: Number,
        require: [true, 'Price is required']
    }

});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;