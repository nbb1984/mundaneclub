var express = require('express');
var router = express.Router();
var Roster = require('../models/roster_names');
var path = require("path");


router.post("/api/Roster/", function(req, res) {

        var newRosterInfo = {
            'memberFirstName': req.body.memberFirstName,
            'memberLastName': req.body.memberLastName,
            'memberInformalName': req.body.memberInformalName,
            'memberFullName': req.body.memberLastName + ', ' + req.body.memberFirstName +  ' (' + req.body.memberInformalName + ')',
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
                    var newRosterEntry = new Roster(newRosterInfo);
                    // Save the new roster entry to the db
                    newRosterEntry.save(newRosterInfo, function(error, doc) {
                        // Log any errors
                        if (!doc) {
                            console.log(error);
                        }

                        else {
                        	console.log("I told you so");
                            return res.json(doc);
                        }
                    });
                } 

                else {
                	console.log("Roster entry updated!!!!");
                    return res.json(update);
                }

            });
});

router.get("/api/roster/getAll", function(req, res) {
    Roster.find({}).sort([["memberLastName", "ascending"]]).exec(function(err, result) {
        if (err) {
            throw err
        } 

        else {
            return res.json(result);
        }
    });
});

router.get("/api/roster/getOne/:id", function(req, res) {
    Roster.find({_id: req.params.id}).exec(function(err, result) {
        if (err) {
            throw err
        } 
        else {
            console.log("Here it is: " + result);
            return res.json(result);
        }
    });
});

router.get("/api/roster/editOne/:id", function(req, res) {
    Roster.find({_id: req.params.id}).exec(function(err, result) {
        if (err) {
            throw err
        } 
        else {
            console.log(result);
            return res.json(result);
        }
    });
});

router.get("/api/Roster/delete/:id", function(req, res) {
    Roster.find({ _id: req.params.id })
    .remove()
    .exec(function (err, result) {
      if (err) throw err;
      return res.json(result);
    });  
});

module.exports = router;