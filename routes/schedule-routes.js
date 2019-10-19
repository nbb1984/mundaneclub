var express = require('express');
var router = express.Router();
var Schedule = require('../models/schedule_items');
var Comment = require('../models/schedule_comments');
var path = require("path");


router.post("/api/Schedule", function(req, res) {

        var newScheduleInfo = {
            eventName: req.body.eventName, 
            eventHostesses: req.body.eventHostesses,
            eventLocation: req.body.eventLocation,
            googleMapsUrl: req.body.googleMapsUrl,
            eventDate: req.body.eventDate,
            formattedEventDate: req.body.formattedEventDate,
            eventTime: req.body.eventTime,
            eventDescription: req.body.eventDescription 
        };

        Schedule
            .findOneAndUpdate({"_id": req.body._id}, newScheduleInfo)
            .catch(function(err) {
                console.log(err);
            })
            .then(function(update) {
               
                if (!update) {
                    var newScheduleEntry = new Schedule(newScheduleInfo);
 
                    newScheduleEntry.save(function(error, doc) {
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

router.get("/api/Schedule/getAll", function(req, res) {
    Schedule.find({}).sort([["formattedEventDate", "descending"]])
        .populate({path: 'eventComments', options: {sort: {"commentDate": "descending"}}})
        .exec(function(err, result) {
            if (err) {
                throw err
            } 

            else {
            	console.log("getting all");
                return res.json(result);
            }
    });
});

router.get("/api/Schedule/getOne/:id", function(req, res) {
    Schedule.find({_id: req.params.id})
        .populate("eventComments")
        .exec(function(err, result) {
            if (err) {
                throw err
            } 
            else {
                return res.json(result);
            }
        });
});

router.get("/api/Schedule/delete/:id", function(req, res) {
    Schedule.find({ _id: req.params.id })
        .remove()
        .exec(function (err, result) {
          if (err) throw err;
          return res.json(result);
        });  
});

// Create a new Comment or replace an existing Comment
router.post("/api/Schedule/addComment/:id", function(req, res) {
  // Create a new Comment and pass the req.body to the entry
  var newComment = new Comment(req.body);
  // And save the new Comment the db
  newComment.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      // Use the scheduleItem id to find and update it's Comment
       Schedule.findOneAndUpdate({ "_id": req.params.id }, { $push: { "eventComments": doc._id } }, { new: true }, function(err, newdoc) {
            // Send any errors to the browser
            if (err) {
              res.send(err);
            }
            // Or send the newdoc to the browser
            else {
              return res.json(newdoc);
            }
        });
      }
    });
  });

// Code to delete a comment.  
router.get("/api/Schedule/deleteComment/:id/:commentId", function(req, res) {
      
      var id = req.params.id;
      var commentId = req.params.commentId;

       Comment.findByIdAndRemove(commentId).exec(function(err, doc) {
            // Send any errors to the browser
            if (err) {
                res.send(err);
            }
            // Or send the newdoc to the browser
            else {
                Schedule.findOneAndUpdate({"_id": id}, {$pull: {"eventComments": doc._id}}, function(err, newdoc){
                    if (err) {
                        res.send(err);
                    }
                    else {
                        return res.json(doc);
                    }
                });
            }
            
          });
    });

module.exports = router;