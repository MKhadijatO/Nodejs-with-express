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
        default: Date.now(),
        select: false
    },
    genres: {
        type: [String],
        required: [true, 'Genres is required']
    }, 
    directors: {
        type: [String],
        required: [true, 'Directors is required']
    },
    coverImage: {
        type: String,
        required: [true, 'Cover image is required']
    },
    actors: {
        type: [String],
        required: [true, 'actors is required']
    },
    price: {
        type: Number,
        require: [true, 'Price is required']
    }

}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

movieSchema.virtual('durationInHours').get(function (req, res) {
    return this.duration / 60;
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;