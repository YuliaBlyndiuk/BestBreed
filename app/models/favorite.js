// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var favSchema = mongoose.Schema({

    user_id: String,
    breed_id: String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Favorite', favSchema);