// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;
// Create the Note schema
var RosterSchema = new Schema({
  // Just a string
  memberFirstName: {
    type: String
  },
  memberLastName: {
    type: String
  },
  memberInformalName: {
    type: String
  },
  memberFullName: {
    type: String
  },
  memberAddress: {
    type: String
  },
  memberCity: {
    type: String
  },
  memberState: {
    type: String
  },
  memberZip: {
    type: String
  },
  memberCellPhone: {
  	type: String
  },
  memberEmail: {
    type: String
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});
// Remember, Mongoose will automatically save the ObjectIds of the searches
// These ids are referred to in the Article model
// Create the Note model with the NoteSchema
var Roster = mongoose.model("Roster", RosterSchema);
// Export the Note model
module.exports = Roster;