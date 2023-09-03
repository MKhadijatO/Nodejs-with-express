const mongoose = require('mongoose');
const fs = require('fs');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength:[100, 'Movie name must not have more than 100 characters'], //max&minlength can only be used on fields of type; String
        minlength:[4, 'Movie name must have more than 4 characters'],
        unique: true,
        trim: true,
        // validate: [validator.isAlpha, "Name should only contain alphabets"]
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
        validate: {
            validator: function(value) {
                return value >= 1 && value <= 10;
            }, 
            message: 'Ratings ({VALUE}) must be from 1 to 10'
        }
        
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
        required: [true, 'Genres is required'],
        // enum: {
        //     values: ["Action", "Adventure", "Comedy", "Sci-Fi", "Drama", "Thriller"],
        //     message: "This genre does not exist"  
        // }
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
    },
    createdBy: String

}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

movieSchema.virtual('durationInHours').get(function () {
    return this.duration / 60;
});

//EXECUTED BEFORE THE DOCUMENT IS SAVED IN DB
//docs EVENT HAPPENS WHEN .save() OR .create() is called .(can be more than one hooks)

//pre save hooks DOCUMENT MIDDLEWARE
movieSchema.pre('save', function (next) {
    this.createdBy = "Somebody"; 

    next();
});
 
//post save hooks
movieSchema.post('save', function (doc, next) {
    const content = `This is a content for log.txt with a new name ${doc.name} and was created by ${doc.createdBy}\n`; 
    fs.writeFileSync('./Log/log.txt', content, {flag:'a'}, (err) =>{
        console.log(err.message);
    });

    next();
    
});


//pre hook for QUERY MIDDLEWARE
movieSchema.pre(/^find/, function(next){
    this.find({releaseDate: {$lte: Date.now()}})
    this.startTime = Date.now();
    next();
}); 
                    //OR
// movieSchema.pre('find', function(next){
//     this.find({releaseDate: {$lte: Date.now()}})

//     next();
// });

//post hook for QUERY MIDDLEWARE
movieSchema.post(/^find/, function(docs, next){
    this.find({releaseDate: {$lte: Date.now()}})
    this.endTime = Date.now();

    const content = `Query took ${this.endTime - this.startTime} ms to fetch the documents.`; 
    fs.writeFileSync('./Log/log.txt', content, {flag:'a'}, (err) =>{
        console.log(err.message);
    });

    next();
}); 


//AGGREGATION MIDDLEWARE
movieSchema.pre('aggregate', function(next){
    console.log(this.pipeline().unshift({$match: {releaseDate: {$lte: new Date}}})); 
    next();
})


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;