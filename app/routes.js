var Breed = require('./models/breed');
var Favorite = require('./models/favorite');


module.exports = function(app, passport) {
	//Home page with login links
	app.get('/', function(req, res) {
		res.render('index.ejs'); //load the index ejs.file
	});

	app.get('/breeds',function(req,res){
		Breed.find({},function(err,data){
			res.send(data);
		});
	});

	app.post('/filter/',function(req,res){
		Breed.find({filters:{$in:req.body.filters}},function(err,data){
			res.send(data);
		});
	});

	app.get('/favorites',isLoggedIn, function(req,res){
		Favorite.find({user_id:req.user._id}, function(err,data){
			var breed_ids = [];
			for (var i = 0; i < data.length; i++) {
				breed_ids.push(data[i].breed_id);
			}
			Breed.find({_id:{$in:breed_ids}},function(err,breedData){
				res.render('favorites.ejs',{favorites:breedData});	
			});
		})
	});

	app.post('/favorites', function(req, res) {
		Favorite.find({user_id:req.user._id,breed_id:req.body.breed_id}, function(err,data){
			if(data.length){
				// delete
				Favorite.remove({user_id:req.user._id,breed_id:req.body.breed_id}, function(err,data){
					res.send(204);
				});
			} else {
				// create new favorite
				Favorite.create({user_id:req.user._id, breed_id:req.body.breed_id},function(err,data){
					res.send(200);
				});
			}
		});
	})







//===============LOGIN====================================================

	//show the login form
	app.get('/login', function(req, res) {
		//render the page and pass in any flash data if it exists
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/search', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	//==============================
	//show the sign up form
	app.get('/signup', function(req,res) {
		//render the page and pass in flash data if it exists
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});

	 // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/search', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


	//=====Profile section====
	//using middleware to verify login
	app.get('/profile', isLoggedIn, function(req,res) {
		res.render('profile.ejs', {
			user: req.user //get the user out of session and pass to template
		});
	});

	//======LOGOUT=====
	app.get('/logout', function(req,res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/search', isLoggedIn, function(req, res) {
		res.render('search.ejs');
	})
};

//route middleware to ensure a user is logged in
function isLoggedIn(req, res, next) {
	//if user is authenticated, continue
	if (req.isAuthenticated())
		return next();
	//if not - redirect them to the home page
	res.redirect('/');

}