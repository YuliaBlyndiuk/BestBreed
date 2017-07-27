// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var breedSchema = mongoose.Schema({

    breed: String,
    description: String,
    image: String,
    filters: [String]

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Breed', breedSchema);
