var express = require('express');
var router = express.Router();

// lock the api route 
// lock with authenticate route
router.use(function(req, res, next){
	// check if request method is GET
	// if GET, then allow it to the api
	if (req.method ==='GET') {
		//continue to the next middleware or request handler
		return next();
	}

	// check if user is authenticated or not
	if(!req.isAuthenticated()){
		// redirect to login page
		return res.redirect('/#login');
	}

	//continue to the next middleware or request handler
	return next();
});

// API for all posts
router.route('/posts')
	.post(function(req, res) {
		// Create a new post
		res.send({
			message: "TODO create a post"
		});
	})
	.get(function(req, res) {
		// get all posts
		res.send({
			message: "TODO retrieve all posts"
		});
	});

// API for a specific post
router.route('/posts/:id')
	.put(function(req, res) {
		// update post
		return res.send({
			message: 'TODO modify the post with ID: ' + req.params.id
		});
	})
	.get(function(req, res) {
		// get post
		return res.send({
			message: 'TODO get the post with ID: ' + req.params.id
		});
	})
	.delete(function(req, res) {
		// delete post
		return res.send({
			message: 'TODO delete the post with ID: ' + req.params.id
		});
	});


module.exports = router;
