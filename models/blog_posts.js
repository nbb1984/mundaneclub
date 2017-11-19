// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;
// Create the Note schema
var PostSchema = new Schema({
  // Just a string
  postAuthor: {
    type: String
  },

  postContent: {
    type: String
  },

  postDate: { 
  	type: String, 
  }
});
// Remember, Mongoose will automatically save the ObjectIds of the searches
// These ids are referred to in the Article model
// Create the Note model with the NoteSchema
var Post = mongoose.model("Post", PostSchema);
// Export the Note model
module.exports = Post;