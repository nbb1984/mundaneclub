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
  eventHostesses: {
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
  },
  eventCommentsVisible: {
    type: Boolean,
    default: false
  },
  eventComments: [{
    type: Schema.Types.ObjectId,
    ref: "ScheduleComments"
  }]
});

var Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;





