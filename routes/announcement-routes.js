var express = require('express');
var router = express.Router();
var Announcements = require('../models/announcement_items');
var path = require("path");


router.post("/api/Announcements/", function(req, res) {
        console.log(req.body.Announcement, "!!!!!!!!!!!!!!!!!!!!!");
        var newAnnouncementsInfo = {
            announcementMessage: req.body.Announcement
        };

        Announcements
            .findOneAndUpdate({"_id": req.body._id}, newAnnouncementsInfo)
            .catch(function(err) {
                console.log(err);
            })
            .then(function(update) {
                // If there is no Announcements entry matching the id...
                if (!update) {
                    // Save the new Announcements entry to the db
                    Announcements.create(newAnnouncementsInfo, function(error, doc) {
                        // Log any errors
                        if (!doc) {
                            console.log(error);
                        }

                        else {
                            console.log(doc);
                            return res.json(doc);
                        }
                    });
                } 

                else {
                    return res.json(update);
                }

            });
});

router.get("/api/Announcements/getAll", function(req, res) {
    Announcements.find({})
        .exec(function(err, result) {
            if (err) {
                throw err
            } 

            else {
                return res.json(result);
            }
    });
});

router.get("/api/Announcements/delete/:id", function(req, res) {
        Announcements.find({ _id: req.params.id })
        .remove()
        .exec(function (err, result) {
          if (err) throw err;
          return res.json(result);
        });  
});

module.exports = router;