var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var assert = require('assert');
var Post = mongoose.model('Post');

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/posts', isAuthenticated);

// API for all posts
router.route('/posts')
	.post(function(req, res) {
		// Create a new post
		var post = new Post();
		post.text = req.body.text;
		post.created_by = req.body.created_by;
		post.save(function(err, post) {
			if (err) {
				return res.status(500).send(err);
			}
			return res.json(post);
		});
	})
	.get(function(req, res) {
		// get all posts
		var query = Post.find(function(err, posts) {
			if (err) {
				return res.status(500).send(err);
			}
			return res.status(200).send(posts);
		});


		assert.ok(query.exec() instanceof require('q').makePromise);
	});

// API for a specific post
router.route('/posts/:id')
	.put(function(req, res) {
		// update post
		Post.findById(req.params.id, function(err, post){
			if(err) return res.send(err);

			post.created_by = req.body.created_by;
			post.text = req.body.text;

			post.save(function(err, post){
				if(err) return res.send(err);

				return res.json(post);
			});
		});
	})
	.get(function(req, res) {
		// get post
		Post.findById(req.params.id, function(err, post) {
			if (err) return res.send(err);

			return res.json(post);
		});
	})
	.delete(function(req, res) {
		// delete post
		Post.remove({
			_id: req.params.id
		}, function(err) {
			if (err) return res.send(err);

			return res.json("deleted :(");
		});
	});


module.exports = router;
