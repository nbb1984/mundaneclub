// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;
// Create the Note schema
var WelcomeSchema = new Schema({
  // Just a string
  welcomeHeading: {
    type: String
  },
  welcomeMessage: { 
  	type: String 
  }
});
// Remember, Mongoose will automatically save the ObjectIds of the searches
// These ids are referred to in the Article model
// Create the Note model with the NoteSchema
var Welcome = mongoose.model("Welcome", WelcomeSchema);
// Export the Note model
module.exports = Welcome;



