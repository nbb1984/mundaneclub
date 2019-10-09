// Include React
var React = require("react");
var helpers = require("../utils/helpers");

var Schedule = React.createClass({

  getInitialState: function() {
    return{ScheduleItems:[], RosterEntries:[], commentVisibility: ["hidden","hidden"]}
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
    helpers.getItems("Roster").then(function(RosterEntries){
      that.setState({RosterEntries:RosterEntries.data});
    });
  },
  
  handleCommentButtonClick: function(event){
    var that = this;
    var i = event.currentTarget.value;
    console.log(event.currentTarget);
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

  handleChange: function (event) {
    var field = event.target.id
    this.setState({[field]: event.target.value});
  },

  handleCommentSubmit: function (event) {
    var that = this;
    var id = event.target.id;
    helpers.createItem("Schedule/addComment/" + id, {
      postAuthor: that.state.postAuthor,
      postContent: that.state.postContent
    }).then(function() { 
      helpers.getItems("Schedule").then(function(ScheduleItems){
        that.setState({
          ScheduleItems:ScheduleItems.data
        });
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
    },function() {
      console.log(that.state.commentDeleteButtonClicked);
    });    
  },

  handleCommentDelete: function(event) {
    var that = this;
    var commentId = event.target.id;
    var ScheduleItemId = event.target.value;
    helpers.deleteItem("Schedule/deleteComment/" + ScheduleItemId + "/" + commentId).then(function(){
      helpers.getItems("Schedule").then(function(ScheduleItems){
        that.setState({
          ScheduleItems:ScheduleItems.data
        });
      });
    });
  },

  render: function() {
    var that = this;
    var ScheduleItems = this.state.ScheduleItems;
    var RosterEntries = this.state.RosterEntries;
    var commentVisibility = this.state.commentVisibility;
    var commentDeleteButtonClicked = this.state.commentDeleteButtonClicked;
    
    if (ScheduleItems.length === 0) {
      ScheduleItems = [
        {eventName: "Nothing", 
        eventLocation: "Nothing",
        googleMapsUrl: "maps.google.com",
        eventDate: "October 8, 2010",
        eventTime: "12:00 p.m.",
        eventDescription:"Fun",
        eventComments: [{name: 'Nick', comment: "Hello!"}] },

        {eventName: "Nothing", 
        eventLocation: "Nothing",
        googleMapsUrl: "maps.google.com",
        eventDate: "October 8, 2010",
        eventTime: "12:00 p.m.",
        eventDescription:"Fun",
        eventComments: [{name: 'Nick', comment: "Hello!"}] }];
    }

    if (RosterEntries.length == 0) {
      RosterEntries = [{
        Announcement: "There are no members that match that query."
      }]
    }
    
    const componentStyle = {
      fontFamily: "font-family: Lucida Console, Courier, monospace",
      fontSize: "18px"
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

    const smallPanelStyle = {
      backgroundColor:"white",
      borderRadius: "7px"
    };

    const searchStyle = {
      width: "50%",
      margin: "0px 0px 0px 2.5%",
    };

    const searchButtonStyle = {
      backgroundColor: "#888eae",
      color: "white"
    };

    const commentDeleteStyle = {
      color: "grey"
    };

    const inputStyle = {
      border: "1 px solid #cccccc",
      width: "100%"
    };

    const h2Style = {
      color: "white",
      margin: "0px 0px 0px 10px"
    };

    const confirmCommentDeleteStyle = {
      border: "1 px solid #cccccc",
      color: "#888eae"
    };

    return (
    <div className = 'row' style={componentStyle}> 
          <div className="col-lg-12">
            <div className="panel panel-primary text-left" style={inPanelStyle}>           
              <div className="panel-body">
                  <div className="panel-body text-left blog-body">
                  {RosterEntries.map(function(entry, i) {
                      return (
                        <div className = "memberEntry" key = {i}>
                          <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                              
                              <p><b>{entry.memberLastName}, {entry.memberFirstName} {entry.memberInformalName}</b> </p>
                              <p>{entry.memberAddress}</p>
                              <p>{entry.memberCity}, {entry.memberState}</p>
                              <p>{entry.memberZip}</p>
                              <p>{entry.memberCellPhone}</p>
                              <p>{entry.memberEmail}</p>
                          
                          </div>
                          <br></br> 
                          <br></br>
                        </div>                
                      );
                    })}                 
                    {ScheduleItems.map(function(item, i) {
                        return (
                          <div>
                            <div className = "scheduleItem" key = {i}>
                              <div className="panel-body text-left schedule-item" style={smallPanelStyle}>  
                                  <p><b>Event Name:</b> {item.eventName}</p>
                                  <p><b>Location:</b>{item.eventLocation} <a href = {item.googleMapsUrl} target="_blank">Directions On Google Maps</a></p>
                                  <p><b>Date:</b>{item.eventDate}</p>
                                  <p><b>Time:</b>{item.eventTime}</p>
                                  <p><b>Description:</b>{item.eventDescription}</p>
                                  <div>
                                    {commentVisibility[i] === "visible" ? (
                                      <div>
                                        <button type="button" className="btn btn-default" onClick = {that.handleCommentButtonClick} value = {i}>Hide Comments</button>                                
                                        <br></br>
                                        <br></br>
                                        <p><b>Leave Comment Here:</b></p>
                                        <form id = {item._id} style = {searchStyle} onSubmit = {that.handleCommentSubmit}>
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
                                        </form>
                                        <br></br>
                                      </div>                                    
                                    ):(
                                        <button type="button" className="btn btn-default" onClick = {that.handleCommentButtonClick} value = {i}>Show Comments ({item.eventComments.length})</button>            
                                    )}
                                  </div>
                                  <div>
                                    {commentVisibility[i] === "visible" ? (
                                          ScheduleItems[i].eventComments.map(function(post, i) {
                                            return (
                                              <div className = "scheduleItem" key = {i}>
                                                <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                                                    
                                                    <p><b> {post.postAuthor}</b> <i> posted {post.commentDate}</i></p>
                                                    <p>{post.postContent}</p>
                                                    <div style = {commentDeleteStyle} onClick = {that.handleCommentDeleteButtonClick} id = {i}><i id= {i}>Delete</i></div>            
                                                    <div>
                                                      {commentDeleteButtonClicked[i] === true ? (
                                                        <div className = "confirmCommentDelete">
                                                          <p style = {confirmCommentDeleteStyle}>Do you want to delete this comment?</p>
                                                          <button id = {post._id} value = {item._id} onClick = {that.handleCommentDelete}>Yes</button><button id = {i} onClick = {that.handleCommentDeleteButtonClick}>No</button>
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

module.exports = Schedule;