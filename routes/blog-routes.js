var express = require('express');
var router = express.Router();
var Blog = require('../models/blog_posts');
var path = require("path");
var moment = require("moment");


router.post("/api/Blog/", function(req, res) {

        var newBlogInfo = {
            'postAuthor': req.body.postAuthor,
            'postContent': req.body.postContent,
            'postDate': moment().format('LLL')
        };

        Blog
            .findOneAndUpdate({"_id": req.body._id}, newBlogInfo)
            .catch(function(err) {
                console.log(err);
            })
            .then(function(update) {
                // If there is no Blog entry matching the id...
                if (!update) {
                    var newBlogEntry = new Blog(newBlogInfo);
                    // Save the new Blog entry to the db
                    newBlogEntry.save(function(error, doc) {
                        // Log any errors
                        if (!doc) {
                            console.log(error);
                        }

                        else {
                            console.log("new post saved!");
                            return res.json(doc);
                        }
                    });
                } 

                else {
                    return res.json(update);
                }

            });
});

router.get("/api/Blog/", function(req, res) {
    Blog.find({}).exec(function(err, result) {
        if (err) {
            throw err
        } 

        else {
            console.log("got blog posts");
            return res.json(result);
        }
    });
});

router.get("/api/Blog/", function(req, res) {
    Blog.find({_id: req.params.id}).exec(function(err, result) {
        if (err) {
            throw err
        } 

        else {
            console.log("got blog posts");
            return res.json(result);
        }
    });
});

router.get("/api/Blog/:postId", function(req, res) {
        Blog.find({ _id: req.params.postId })
        .remove()
        .exec(function (err, result) {
          if (err) throw err;
          return res.json(result);
        });  
});

module.exports = router;