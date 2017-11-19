// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;
// Create the Note schema
var ScheduleSchema = new Schema({
  // Just a string
  eventName: {
    type: String
  },
  eventLocation: { 
  	type: String 
  },
  googleMapsUrl: {
    type: String
  },
  eventDate: {
    type: String
  },
  formattedEventDate: {
    type: Date
  },
  eventTime: {
    type: String
  },
  eventDescription: {
    type: String
  }
});
// Remember, Mongoose will automatically save the ObjectIds of the searches
// These ids are referred to in the Article model
// Create the Note model with the NoteSchema
var Schedule = mongoose.model("Schedule", ScheduleSchema);
// Export the Note model
module.exports = Schedule;





