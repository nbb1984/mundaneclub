// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var Typeahead = require('react-bootstrap-typeahead').Typeahead;
var Schedule = React.createClass({

  getInitialState: function() {
    return{
        commentVisibility: ["hidden","hidden"]
     };
  },

  componentDidMount: function() {
    var that = this;
    var commentVisibility = [];
    var commentDeleteButtonClicked = [];
    helpers.getItems("Schedule/getAll").then(function(ScheduleItems){
      that.setState({
        ScheduleItems:ScheduleItems.data,
        ScheduleItemsVisible: ScheduleItems.data
      }, function (){
          var ScheduleItemsVisible = that.state.ScheduleItemsVisible;
          for (var i = 0; i < ScheduleItemsVisible.length; i++) {
            commentVisibility.push("hidden");
          }
          
          that.setState({
            commentVisibility: commentVisibility
          });

      });
    });
	},

  handleChange: function (event) {
    var that = this;
    var field = event;
    var query = event;
    if (event.target) {
      field = event.target.id;
      query = event.target.value; 
    } else {
      field = "searchQuery";
    }
    this.setState({[field]: query});
  },

  handleSearchBarClick: function (event) {
      var x = document.getElementsByTagName("Typeahead");
    console.log(x);
  },

  handleSearchSubmit: function(event) {
  	var that = this;
    var data = this.state.ScheduleItems;
    var query = this.state.searchQuery[0];
    data.map(function(item, i) {
    	if (item.eventName === query || item.eventLocation === query || item.eventDate === query || item.eventDescription === query) {
    		query = item._id;
    		console.log(query);
    	}
    });

    helpers.getItem("Schedule/getOne/" + query).then(function(Results){
      that.setState({ScheduleItemsVisible: Results.data});
    });
  },

  handleDelete: function(event) {
    var that = this;
    helpers.deleteItem("Schedule/delete/" + event.target.value).then(function(ScheduleItems){
      helpers.getItems("Schedule/getAll").then(function(ScheduleItems){
          that.setState({
            ScheduleItems:ScheduleItems.data,
            ScheduleItemsVisible: ScheduleItems.data
          });
      });
    });
  },

  handleCommentButtonClick: function (event) {

    var that = this;
    var ScheduleItems = this.state.ScheduleItemsVisible;
    var i;
    if (event.target.id) {
      i = event.target.id;
    } 

    else {
      i = event.target.parentNode.id;
    }

    if (ScheduleItems[i].eventCommentsVisible) {
      ScheduleItems[i].eventCommentsVisible = false;
    } 

    else {
      ScheduleItems[i].eventCommentsVisible = true;   
    }

    this.setState({ScheduleItems: ScheduleItems});
  },

  handleCommentSubmit: function (event) {

    event.preventDefault();
    var that = this;
    var id = event.target.id;
    var ScheduleItems = this.state.ScheduleItems;
    var i = event.target.className;
    helpers.createItem("Schedule/addComment/" + id, {
      postAuthor: that.state.postAuthor,
      postContent: that.state.postContent
    }).then(function() { 
      helpers.getItems("Schedule/getAll").then(function(ScheduleItems){
        console.log(ScheduleItems.data);
        ScheduleItems.data[i].eventCommentsVisible = true;
          that.setState({
            ScheduleItems:ScheduleItems.data,
            ScheduleItemsVisible: ScheduleItems.data
          });
      });
    });
  },

  handleCommentDeleteButtonClick: function(event) {
    var that = this;
    var ScheduleItems = this.state.ScheduleItems;
    var i = event.target.id;
    var k = event.target.className;
    var clicked = ScheduleItems[k].eventComments[i].commentDeleteButtonClicked;

      if (clicked === true) {
        ScheduleItems[k].eventComments[i].commentDeleteButtonClicked = false;
      }
      else {
        ScheduleItems[k].eventComments[i].commentDeleteButtonClicked = true;
      }
    this.setState({ScheduleItems: ScheduleItems});  
  },

  handleCommentDelete: function(event) {

    var that = this;
    var i = event.target.id;
    var k = event.target.value;
    var j = event.target.className;
    var ScheduleItems = this.state.ScheduleItems;
    console.log(i, k, j);

    var id = ScheduleItems[j]._id;


    helpers.deleteItem("Schedule/deleteComment/" + id + "/" + i).then(function(ScheduleItems){
      helpers.getItems("Schedule/getAll").then(function(ScheduleItems){
        ScheduleItems.data[j].eventCommentsVisible = true;
          that.setState({
            ScheduleItems:ScheduleItems.data,
            ScheduleItemsVisible: ScheduleItems.data
          });
      });
    });
  },

  render: function() {
    var typeaheadOptions = [];
    var autoCompleteOptions = [];
    var that = this;
    var ScheduleItems = [        
    	{eventName: "Nothing", 
        eventLocation: "Nothing",
        googleMapsUrl: "maps.google.com",
        eventDate: "October 8, 2010",
        eventTime: "12:00 p.m.",
        eventDescription:"Fun",
        eventComments: [{name: 'Nick', comment: "Hello!"}] }
    ]
    
  	if (this.state.ScheduleItemsVisible) {
       ScheduleItems = this.state.ScheduleItemsVisible;
  	}
    if (this.state.ScheduleItems) {
       autoCompleteOptions = this.state.ScheduleItems;
    }

    autoCompleteOptions.map(function(Item){
      typeaheadOptions.push(Item.eventName, Item.eventLocation, Item.eventDate, Item.eventDescription);        
    });

    var SearchResults = this.state.searchResults;
    var commentsVisibility = this.state.commentVisibility;
    var commentDeleteButtonClicked = this.state.commentDeleteButtonClicked;

    if (!SearchResults) {
      SearchResults = [];
    }

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

    return (
        <div className = 'row' style={componentStyle}> 
          <div className="col-lg-12">
            <div className="panel panel-primary text-left" style={inPanelStyle}>
              <br></br>
              <br></br>
              <div className="panel-heading" style={panelHeadingStyle}>
                <h2>Mundane Club Schedule</h2>
              </div>
              <br></br>
                <form style = {searchStyle}  id = {this.state.searchQuery} onSubmit = {this.handleSearchSubmit} value = {this.state.searchQuery}>
                  <div className="form-group">
                    <Typeahead options={typeaheadOptions} id = "searchQuery" onClick = {this.handleSearchBarClick} onChange = {this.handleChange} value = {this.state.searchQuery} placeholder="Search for Events by EventName, Location, or Date"/>                  
                   </div>
                  <button type="submit" className="btn btn-default" style = {searchButtonStyle} onMouseEnter = {this.props.hoverLink} onMouseLeave = {this.props.unHoverLink}>Submit</button> 
                  &nbsp;                
                </form>

              <div className="panel-body">

                  <div className="panel-body text-left blog-body">
                    
                    <br></br>
                    <br></br>          

                    {ScheduleItems.map(function(item, i) {
                    	var k = i;
                        return (
                          <div>
                            <div className = "scheduleItem" key = {i}>
                              <div className="panel-body text-left schedule-item" style={smallPanelStyle}>  
                                  <p><b>Event Name:</b> {item.eventName}</p>
                                  <p><b>Location:</b> {item.eventLocation} <a href = {item.googleMapsUrl} target="_blank">Directions On Google Maps</a></p>
                                  <p><b>Date:</b> {item.eventDate}</p>
                                  <p><b>Time:</b> {item.eventTime}</p>
                                  <p><b>Description:</b> {item.eventDescription}</p>
                                  <div>
                                    {ScheduleItems[i].eventCommentsVisible === true ? (
                                      <div>
                                        <button type="button" className="btn btn-default" onClick = {that.handleCommentButtonClick} id = {i}>Hide Comments</button>                                
                                        <br></br>
                                        <br></br>
                                        <p><b>Leave Comment Here:</b></p>
                                        <form id = {item._id} className = {i} style = {searchStyle} onSubmit = {that.handleCommentSubmit}>
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
                                        <button type="button" className="btn btn-default" onClick = {that.handleCommentButtonClick} id = {i}>Show Comments ({item.eventComments.length})</button>            
                                    )}
                                  </div>
                                  <div>
                                    {ScheduleItems[i].eventCommentsVisible === true ? (
                                          ScheduleItems[i].eventComments.map(function(post, i) {
                                            return (
                                              <div className = "scheduleItem" key = {i}>
                                                <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                                                    
                                                    <p><b> {post.postAuthor}</b> <i> posted {post.commentDate}</i></p>
                                                    <p>{post.postContent}</p>
                                                    <div style = {commentDeleteStyle} className = {k} onClick = {that.handleCommentDeleteButtonClick} id = {i}><i id = {i} className = {k}>Delete</i></div>            
                                                    <div>
                                                      {post.commentDeleteButtonClicked === true ? (
                                                        <div className = "confirmCommentDelete">
                                                          <p style = {confirmCommentDeleteStyle}>Do you want to delete this comment?</p>
                                                          <button id = {post._id} value = {i} className = {k} onClick = {that.handleCommentDelete}>Yes</button><button id = {i} className = {k} onClick = {that.handleCommentDeleteButtonClick}>No</button>
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