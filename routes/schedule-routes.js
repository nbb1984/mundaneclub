var express = require('express');
var router = express.Router();
var Schedule = require('../models/schedule_items');
var path = require("path");


router.post("/api/schedule/", function(req, res) {

        var newScheduleInfo = {
            eventName: req.body.eventName, 
            eventLocation: req.body.eventLocation,
            googleMapsUrl: req.body.googleMapsUrl,
            eventDate: req.body.eventDate,
            eventTime: req.body.eventTime,
            eventDescription: req.body.eventDescription 
        };

        Schedule
            .findOneAndUpdate({"_id": req.body._id}, newScheduleInfo)
            .catch(function(err) {
                console.log(err);
            })
            .then(function(update) {
                // If there is no Schedule entry matching the id...
                if (!update) {
                    // Save the new Schedule entry to the db
                    Schedule.create(newScheduleInfo, function(error, doc) {
                        // Log any errors
                        if (!doc) {
                            console.log(error);
                        }

                        else {
                            return res.json(doc);
                        }
                    });
                } 

                else {
                    return res.json(update);
                }

            });
});

router.get("/api/Schedule/", function(req, res) {
    Schedule.find({}).sort([["formattedEventDate", "descending"]])
        .exec(function(err, result) {
            if (err) {
                throw err
            } 

            else {
                return res.json(result);
            }
    });
});

router.get("/api/Schedule/:id", function(req, res) {
    Schedule.find({_id: req.params.id}).exec(function(err, result) {
        if (err) {
            throw err
        } 

        else {
            return res.json(result);
        }
    });
});

router.get("/api/Schedule/:id", function(req, res) {
        Schedule.find({ _id: req.params.id })
        .remove()
        .exec(function (err, result) {
          if (err) throw err;
          return res.json(result);
        });  
});

module.exports = router;