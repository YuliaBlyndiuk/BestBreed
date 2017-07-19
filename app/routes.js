module.exports = function(app, passport) {
	//Home page with login links
	app.get('/', function(req, res) {
		res.render('index.ejs'); //load the index ejs.file
	});

	//show the login form
	app.get('/login', function(req, res) {
		//render the page and pass in any flash data if it exists
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	//==============================
	//show the sign up form
	app.get('/signup', function(req,res) {
		//render the page and pass in flash data if it exists
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});

	//process the sign up form
	//app.post('/signup', do all our passport stuff here);

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
};

//route middleware to ensure a user is logged in
function isLoggedIn(req, res, next) {
	//if user is authenticated, continue
	if (req.isAuthenticated())
		return next();
	//if not - redirect them to the home page
	req.redirect('/');

}