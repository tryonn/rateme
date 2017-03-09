
module.exports = (app, passport) => {

	app.get('/', function(req, res, next){
		res.render('index', {title: 'Index || RateMe'});
	});

	app.get('/signup', (req, res) => {
		var errors = req.flash('error');
		console.log(errors);
		res.render('user/signup', {title: 'Sign Up || RateMe', messages: errors, hasErros: errors.length > 0});
	});

	app.post('/signup', validator, passport.authenticate('local.signup', {
		succeddRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/login', (req, res) => {
		res.render('user/login', {title: 'Login || RateMe'});
	});
}

// criando funcao de validacao dos campos de login / acesso
function validator(req, res, next){
		req.checkBody('fullname', 'Fullname is Required').notEmpty();
		req.checkBody('fullname', 'Fullname Must Not Be Less Than 5').isLength({min:5});
		req.checkBody('email', 'Email is Required').notEmpty();
		req.checkBody('email', 'Email is Invalid').isEmail();
		req.checkBody('password', 'Password is Required').notEmpty();
		req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({min:5});
		req.checkBody('password', "Password Must Contain at least 1  Number.").matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");

		var errors = req.validationErrors();

		if(errors){
				var messages = [];
				errors.forEach((error) => {
						messages.push(error.msg);
				});

				req.flash('error', messages);
				res.redirect('/signup');
		} else {
			return next();
		}
}
