var express = require('express');
var router = express.Router();
var Roster = require('../models/roster_names');
var path = require("path");


router.post("/api/roster/", function(req, res) {

        var newRosterInfo ={
            'name': req.body.name,
            'address': req.body.address,
            'email': req.body.email,
            'cellPhone': req.body.cellPhone
        };

        Roster
            .findOneAndUpdate({"_id": req.body._id}, newRosterInfo)
            .catch(function(err) {
                console.log(err);
            })
            .then(function(update) {
                // If there is no roster entry matching the id...
                if (!update) {
                    var newRosterEntry = new Roster(newRosterInfo);
                    // Save the new roster entry to the db
                    newRosterEntry.save(function(error, doc) {
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

router.get("/api/roster/", function(req, res) {
    Roster.find({}).exec(function(err, result) {
        if (err) {
            throw err
        } 

        else {
            return res.json(result);
        }
    });
});

router.get("/api/roster/:id", function(req, res) {
        Roster.find({ _id: req.params.id })
        .remove()
        .exec(function (err, result) {
          if (err) throw err;
          return res.json(result);
        });  
});

module.exports = router;