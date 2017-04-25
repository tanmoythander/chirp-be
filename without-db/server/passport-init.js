var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
//temporary data store
var users = {};
var userCount = 0;
module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {

		//tell passport which id to use for user
		console.log('serializing user:',user.username);
		return done(null, user.username);
	});

	passport.deserializeUser(function(username, done) {

		// return user object back
		return done(null, users[username]);

	});

	passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) { 
			// if username is invalid
			if (!users[username]) {
				return done('user not found', false);
			}
			// if password is invalid
			if (!isValidPassword(users[username], password)) {
				return done('invalid password', false);
			}

			// successfully signed in
			userCount++;
			console.log('Currently users: ' + userCount);
			console.log(users);

			return done(null, users[username]);
		}
	));

	passport.use('signup', new LocalStrategy({
			passReqToCallback : true // allows us to pass back the entire request to the callback
		},
		function(req, username, password, done) {
			//check the user already exists
			if (users[username]) {
				return done('user already taken', false);
			}
			//add user to db
			users[username] = {
				username: username,
				password: createHash(password)
			};

			// successfully signed in
			userCount++;
			console.log('Currently users: ' + userCount);
			console.log(users);

			return done(null, users[username]);
		})
	);
	
	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};
