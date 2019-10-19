// Include React
var React = require("react");
var helpers = require("../../utils/helpers");
var Typeahead = require('react-bootstrap-typeahead').Typeahead;
var ScheduleEdit = React.createClass({
  
  getInitialState: function() {
    var that = this;
    return{ScheduleItems:[], eventName: "", 
        eventLocation: '',
        googleMapsUrl: '',
        eventDate: '',
        eventTime: '',
        eventDescription: '',
        commentVisibility: ["hidden","hidden"]};
  },

  componentDidMount: function() {
    var that = this;
    var commentVisibility = [];
    var commentDeleteButtonClicked = [];

    helpers.getItems("Schedule/getAll").then(function(ScheduleItems){
      that.setState({
        ScheduleItems:ScheduleItems.data
      }, function (){
        console.log(that.state.ScheduleItems);
          for (var i = 0; i < ScheduleItems.data.length; i++) {
            commentVisibility.push("hidden");
          }
          
          that.setState({
            commentVisibility: commentVisibility
          });

      });
    });
  },

  handleChange: function (event) {
    
    var field = event.target.id
    this.setState({[field]: event.target.value});
  
  },

  handleSubmit: function (event) {
  	
  	var editClicked = this.state.editClicked;
    var that = this;
    var id = event.target.id;
    helpers.createItem("Schedule/", {

      eventName: that.state.eventName,
      eventHostesses: that.state.eventHostesses,
      eventLocation: that.state.eventLocation,
      googleMapsUrl: that.state.googleMapsUrl,
      eventDate: that.state.eventDate,
      eventTime: that.state.eventTime,
      formattedEventDate: that.state.formattedEventDate,
      eventDescription: that.state.eventDescription

    }).then(function() { 
    	if (editClicked) {
		    helpers.deleteItem("Schedule/delete/" + that.state._id).then(function(ScheduleItems){
		      helpers.getItems("Schedule/getAll/").then(function(ScheduleItems){
		          that.setState({
		          	ScheduleItems:ScheduleItems.data,
		          	editClicked: false
		          }, function(){
		          	console.log(that.state.editClicked);
		          });
		      });
		    });
    	} else {
			helpers.getItems("Schedule/getAll").then(function(ScheduleItems){
				console.log("getting all");
				console.log(that.state.editClicked);
				that.setState({
				  ScheduleItems:ScheduleItems.data
				}, function() {console.log(that.state.ScheduleItems);});
			});
		}
    });
  },


  handleEdit: function(event) {
    event.preventDefault();
    var that = this;
    helpers.getItem("Schedule/getOne/" + event.target.value).then(function(Item){
      var Data = Item.data[0];
      that.setState({
      	editClicked: true,
        _id: Data._id,
        eventName: Data.eventName, 
        eventHostesses: Data.eventHostesses,
        eventLocation: Data.eventLocation,
        googleMapsUrl: Data.googleMapsUrl,
        eventDate: Data.eventDate,
        formattedEventDate: Data.formattedEventDate,
        eventTime: Data.eventTime,
        eventDescription: Data.eventDescription
      });
    });
  },

  handleDelete: function(event) {
    var that = this;
    helpers.deleteItem("Schedule/delete/" + event.target.value).then(function(ScheduleItems){
      helpers.getItems("Schedule/getAll/").then(function(ScheduleItems){
          that.setState({ScheduleItems:ScheduleItems.data});
      });
    });
  },

  handleCommentButtonClick: function(event){
    var that = this;
    var i = event.currentTarget.value;
    var commentVisibility = this.state.commentVisibility;
    var commentDeleteButtonClicked = [];
    var eventComments = this.state.ScheduleItems[i].eventComments;

    if (commentVisibility[i] === "visible") {
      commentVisibility.splice(i, 1, "hidden");
    }

    else {
      commentVisibility.splice(i, 1, "visible");
    }

    for (var i = 0; i < eventComments.length; i++) {
      commentDeleteButtonClicked.push(false);
    }

    this.setState({
      commentVisibility: commentVisibility,
      commentDeleteButtonClicked: commentDeleteButtonClicked
    });
  },

  handleCommentSubmit: function (event) {
    event.preventDefault();
    var that = this;
    var i = event.target.id;
    var id = event.target.className;
   	var ScheduleItems = this.state.ScheduleItems;
   	ScheduleItems[i].eventComments.unshift({
   		postAuthor: that.state.postAuthor,
   		postContent: that.state.postContent
   	});

   	this.setState({ScheduleItems: ScheduleItems}, function(){
	    helpers.createItem("Schedule/addComment/" + id, {
	      postAuthor: that.state.postAuthor,
	      postContent: that.state.postContent
	    });
   	});
    
  },
  handleCommentDeleteButtonClick: function(event) {
    var i = event.target.id;
    var commentDeleteButtonClicked = this.state.commentDeleteButtonClicked;

    if (commentDeleteButtonClicked[i]) {
      commentDeleteButtonClicked.splice(i, 1, false);
    }

    else {
      commentDeleteButtonClicked.splice(i, 1, true);
    }
    var that = this;
    this.setState({
      commentDeleteButtonClicked: commentDeleteButtonClicked
    });    
  },

  handleCommentDelete: function(event) {
    var that = this;
  
    var i = event.target.value;//scheduleitem id
    var j = event.target.id;//comment id
    var k = event.target.className;

    var ScheduleItems = this.state.ScheduleItems;
    console.log(event.target);

    // var id = ScheduleItems[j]._id;


    helpers.deleteItem("Schedule/deleteComment/" + i + "/" + j).then(function(ScheduleItems){
      helpers.getItems("Schedule/getAll").then(function(ScheduleItems){
        ScheduleItems.data[k].eventCommentsVisible = true;
          that.setState({
            ScheduleItems:ScheduleItems.data,
            ScheduleItemsVisible: ScheduleItems.data
          });
      });
    });
    // var that = this;
    // var commentId = event.target.id;
    // var ScheduleItemId = event.target.value;
    // var commentDeleteButtonClicked = this.state.commentDeleteButtonClicked;
    // helpers.deleteItem("Schedule/deleteComment/" + ScheduleItemId + "/" + commentId).then(function(){
    //   helpers.getItems("Schedule/getAll").then(function(ScheduleItems){
    //     commentDeleteButtonClicked.splice(commentId, 1);
    //     that.setState({
    //       ScheduleItems:ScheduleItems.data,
    //       commentDeleteButtonClicked: commentDeleteButtonClicked
    //     });
    //   });
    // });
  },

  render: function() {
    var typeaheadOptions = [];
    this.state.ScheduleItems.map(function(Item){
      typeaheadOptions.push(Item.eventName, Item.eventLocation, Item.eventDate, Item.eventDescription);        
    });

    var that = this;
    var ScheduleItems = [
        {eventName: "Nothing", 
        eventHostesses: "Nothing",
        eventLocation: "Nothing",
        googleMapsUrl: "maps.google.com",
        eventDate: "October 8, 2010",
        eventTime: "12:00 p.m.",
        eventDescription:"Fun",
        eventComments: [{name: 'Nick', comment: "Hello!"}]
    	}]
    ScheduleItems = this.state.ScheduleItems;
    var SearchResults = this.state.searchResults;
    var commentsVisibility = this.state.commentVisibility;
    var commentDeleteButtonClicked = this.state.commentDeleteButtonClicked;

    const componentStyle = {
      fontFamily: "font-family: Lucida Console, Courier, monospace"
    };

    const inPanelStyle = {
      backgroundColor:"transparent",
      border: "none",
    };

    const panelHeadingStyle = {
      margin: "0px 0px 0px 15px",
      backgroundColor:"transparent",
      border: "none"
    };

    const inputPanelStyle = {
      backgroundColor:"transparent",
      border: "none",
      visibility: "hidden"      
    };

    const smallPanelStyle = {
      backgroundColor:"white",
      borderRadius: "7px"
    };

    const inputStyle = {
      border: "1 px solid #cccccc",
      width: "100%"
    };

    const searchButtonStyle = {
      backgroundColor: "#888eae",
      color: "white"
    };

    const searchStyle = {
      width: "50%",
      margin: "0px 0px 0px 2.5%",
    };

    const commentDeleteStyle = {
      fontSize: "10px",
      color: "grey"
    };

    const confirmCommentDeleteStyle = {
      border: "1 px solid #cccccc",
      color: "#888eae"
    };
    const h2style = {
      color: "white",
      textShadow: "2px 2px #cccccc"
    };

    const editButtonStyle = {
      backgroundColor: this.state.editButtonStyle
    };

    return (
        <div className = 'row' style={componentStyle}> 
          <div className="col-lg-12">
            <div className="panel panel-primary text-left" style={inPanelStyle}>
              <br></br>
              <br></br>
              <div className="panel-heading" style={panelHeadingStyle}>
                <h2 style = {h2style}>Schedule Editing Board</h2>
              </div>
              <br></br>

              <div className="panel-body">
                  <div className="panel-body text-left input-panel" style={inPanelStyle}>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <br></br>
                        <input
                          value = {this.state.eventName}
                          onChange = {this.handleChange}
                          placeholder="Event Name"
                          type="text"
                          className="form-control text-left"
                          id="eventName"
                          required
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.eventHostesses}
                          onChange = {this.handleChange}
                          placeholder="Hostesses"
                          type="text"
                          className="form-control text-left"
                          id="eventHostesses"
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.eventLocation}
                          onChange = {this.handleChange}
                          placeholder="Location"
                          type="text"
                          className="form-control text-left"
                          id="eventLocation"
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.googleMapsUrl}
                          onChange = {this.handleChange}
                          placeholder="Google Maps Url"
                          type="text"
                          className="form-control text-left"
                          id="googleMapsUrl"
                          required
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.eventDate}
                          onChange = {this.handleChange}
                          placeholder="Date"
                          type="text"
                          className="form-control text-left"
                          id="eventDate"
                          required
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.formattedEventDate}
                          onChange = {this.handleChange}
                          placeholder="Formatted Date (eg. 2015-03-25)"
                          type="text"
                          className="form-control text-left"
                          id="formattedEventDate"
                          required
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.eventTime}
                          onChange = {this.handleChange}
                          placeholder="Time"
                          type="text"
                          className="form-control text-left"
                          id="eventTime"
                          required
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.eventDescription}
                          onChange = {this.handleChange}
                          placeholder="Description"
                          type="text"
                          className="form-control text-left"
                          id="eventDescription"
                          required
                          style={inputStyle}
                        />
                        <br />
                        <button
                          className="btn btn-default blue"
                          type="submit"
                          style = {searchButtonStyle}
                          onMouseEnter = {this.props.hoverLink} 
                          onMouseLeave = {this.props.unHoverLink}
                        >
                          Submit
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-default clear"
                          type= "reset"
                          style = {searchButtonStyle}
                          onMouseEnter = {this.props.hoverLink} 
                          onMouseLeave = {this.props.unHoverLink}

                        >
                          Clear
                        </button>
                      </div>
                    </form>
                  </div>

                  <br></br> 
                  <br></br>

                  <div className="panel-body text-left blog-body">
                    
                    <br></br>
                    <br></br>                

                    {ScheduleItems.map(function(item, i) {
                        return (
                          <div>
                            <div className = "scheduleItem" key = {i}>
                              <div className="panel-body text-left schedule-item" style={smallPanelStyle}>  
                                  <p><b>Event Name:</b> {item.eventName}</p>
                                  <p><b>Hostesses:</b> {item.eventHostesses}</p>
                                  <p><b>Location:</b> {item.eventLocation} <a href = {item.googleMapsUrl} target="_blank">Directions On Google Maps</a></p>
                                  <p><b>Date:</b> {item.eventDate}</p>
                                  <p><b>Time:</b> {item.eventTime}</p>
                                  <p><b>Description:</b> {item.eventDescription}</p>

	                              <button type="button" className="btn btn-default" onClick = {that.handleEdit} value = {item._id} style={{editButtonStyle}}>Edit</button>
	                              &nbsp;
	                              <button type="button" className="btn btn-default" onClick = {that.handleDelete} value = {item._id}>Delete</button>                                 
	                              <div>
                                    
                                    {commentsVisibility[i] === "visible" ? (
                                      <div>
                                        <button type="button" className="btn btn-default" onClick = {that.handleCommentButtonClick} value = {i}>Hide Comments</button>                                
                                        <br></br>
                                        <br></br>
                                        <p><b>Leave Comment Here:</b></p>
                                        <form id = {i} className = {item._id} key = {i} style = {searchStyle} onSubmit = {that.handleCommentSubmit}>
                                          <div className="form-group">
                                            <input
                                              value = {that.state.postAuthor}
                                              onChange = {that.handleChange}
                                              placeholder="Name"
                                              type="text"
                                              className="form-control text-left"
                                              id="postAuthor"
                                              required
                                              style={inputStyle}
                                            />
                                            <input
                                              value = {that.state.postContent}
                                              onChange = {that.handleChange}
                                              placeholder="Comment"
                                              type="text"
                                              className="form-control text-left"
                                              id="postContent"
                                              style={inputStyle}
                                            />
                                          </div>
                                          <button type="submit" className="btn btn-default" style = {searchButtonStyle} onMouseEnter = {that.props.hoverLink} onMouseLeave = {that.props.unHoverLink}>Post Comment</button>
                                          <button type="reset" className="btn btn-default" style = {searchButtonStyle} onMouseEnter = {that.props.hoverLink} onMouseLeave = {that.props.unHoverLink}>Clear</button>
                                        </form>
                                        <br></br>
                                      </div>                                    
                                    ):(
                                        <button type="button" className="btn btn-default" onClick = {that.handleCommentButtonClick} value = {i}>Show Comments ({item.eventComments.length})</button>            
                                    )}
                                  </div>
                                  <div>
                                    {commentsVisibility[i] === "visible" ? (
                                          ScheduleItems[i].eventComments.map(function(post, j) {
                                            console.log(j);
                                            return (
                                              <div className = "scheduleItem" key = {j}>
                                                <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                                                    
                                                    <p><b> {post.postAuthor}</b> <i> posted {post.commentDate}</i></p>
                                                    <p>{post.postContent}</p>
                                                    <div style = {commentDeleteStyle} onClick = {that.handleCommentDeleteButtonClick} id = {j}><i id= {j}>Delete</i></div>            
                                                    <div>
                                                      {commentDeleteButtonClicked[j] === true ? (
                                                        <div className = "confirmCommentDelete">
                                                          <p style = {confirmCommentDeleteStyle}>Do you want to delete this comment?</p>
                                                          <button id = {post._id} value = {item._id} className = {i} onClick = {that.handleCommentDelete}>Yes</button><button id = {j} onClick = {that.handleCommentDeleteButtonClick}>No</button>
                                                        </div>
                                                        ):(null)
                                                      }
                                                    </div>                                  
                                                </div>
                                              </div>                
                                            )
                                          })                           
                                    ):(null)}
                                  </div>                
                              </div>
                            </div>
                              <br></br>
                              <br></br>
                          </div>
                        )
                      })
                    }
                  </div>
              </div>
            </div>
          </div>
        </div>
        );
  }
});

module.exports = ScheduleEdit;