var express = require('express');
var router = express.Router();
var Roster = require('../models/roster_names');
var path = require("path");


router.post("/api/roster/", function(req, res) {

        var newRosterInfo ={
            'memberName': req.body.memberName,
            'memberAddress': req.body.memberAddress,
            'memberCity': req.body.memberCity,
            'memberState': req.body.memberState,
            'memberZip': req.body.memberZip,
            'memberEmail': req.body.memberEmail,
            'memberCellPhone': req.body.memberCellPhone
        };

        Roster
            .findOneAndUpdate({"_id": req.body._id}, newRosterInfo)
            .catch(function(err) {
                console.log(err);
            })
            .then(function(update) {
                // If there is no roster entry matching the id...
                if (!update) {
                    // Save the new roster entry to the db
                    Roster.create(newRosterInfo, function(error, doc) {
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

router.get("/api/roster/find/:id", function(req, res) {
    Roster.find({_id: req.params.id}).exec(function(err, result) {
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