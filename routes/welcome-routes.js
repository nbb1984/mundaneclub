var express = require('express');
var router = express.Router();
var Welcome = require('../models/welcome_items');
var path = require("path");


router.post("/api/Welcome/", function(req, res) {

        var newWelcomeInfo = {
            welcomeHeading: req.body.welcomeHeading,
            welcomeMessage: req.body.welcomeMessage
        };

        Welcome
            .findOneAndUpdate({"_id": req.body._id}, newWelcomeInfo)
            .catch(function(err) {
                console.log(err);
            })
            .then(function(update) {
                // If there is no Welcome entry matching the id...
                if (!update) {
                    // Save the new Welcome entry to the db
                    Welcome.create(newWelcomeInfo, function(error, doc) {
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

router.get("/api/Welcome/getAll", function(req, res) {
    Welcome.find({})
        .exec(function(err, result) {
            if (err) {
                throw err
            } 

            else {
                return res.json(result);
            }
    });
});

router.get("/api/Welcome/delete/:id", function(req, res) {
        Welcome.find({ _id: req.params.id })
        .remove()
        .exec(function (err, result) {
          if (err) throw err;
          return res.json(result);
        });  
});

module.exports = router;