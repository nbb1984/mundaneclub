// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;
// Create the Note schema
var ScheduleCommentsSchema = new Schema({
  // Just a string
  postAuthor: {
    type: String,
    required: true
  },
  postContent: { 
  	type: String, 
    required: true
  },
  commentDate: {
    type: Date,
    default: Date.now
  },
  commentDeleteButtonClicked: {
    type: Boolean,
    default: false
  }
});
// Remember, Mongoose will automatically save the ObjectIds of the searches
// These ids are referred to in the Article model
// Create the Note model with the NoteSchema
var ScheduleComments = mongoose.model("ScheduleComments", ScheduleCommentsSchema);
// Export the Note model
module.exports = ScheduleComments;





