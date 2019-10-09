// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;
var roster = require("./children/roster");
var helpers = require("./utils/helpers");
// Helper for making AJAX requests to our API
//var helpers = require("./utils/helpers");
// Creating the Main component
var Main = React.createClass({

  getInitialState: function(){
      return {searchTerm: "", adminButtonVisibility: "hidden"}
  },

  componentDidMount: function() {
    var that = this;
    helpers.getUser().then(function(user) {
      console.log(user);
      if (user.data.email == "joyoflife57@mac.com") {
        that.setState({adminButtonVisibility: "visible"});
      } else {
        that.setState({adminButtonVisibility: "hidden"});
      }
    });
    helpers.getItems("Schedule/getAll").then(function(ScheduleItems){
      that.setState({
        ScheduleItems:ScheduleItems.data
      });
    });
  },

  handleCommentButtonClick: function(event){
    var that = this;
    var i = event.currentTarget.value;
    var ScheduleItems = this.state.ScheduleItems;
    if (!ScheduleItems[i].eventCommentsVisible) {
		ScheduleItems[i].eventCommentsVisible = true;

    } else {
		ScheduleItems[i].eventCommentsVisible = false;
    }
    this.setState({
    	ScheduleItems: ScheduleItems
    });
  },

  handleCommentDeleteButtonClick: function(event){
  	var that = this;
  	var i = event.target.id;
  	var k = event.target.className;
  	var ScheduleItems = this.state.ScheduleItems;
  	var clicked = ScheduleItems[k].eventComments[i].commentDeleteButtonClicked;
  	if (clicked) {
  		clicked = false;
  	} else {
  		clicked = true;
  	}
  	ScheduleItems[k].eventComments[i].commentDeleteButtonClicked = clicked;
    this.setState({
    	ScheduleItems: ScheduleItems
    }, function() {
    	console.log(that.state.ScheduleItems);
    });  	
  },

  handleCommentDelete: function(event) {
    var that = this;
    var commentId = event.target.id;
    var ScheduleItemId = event.target.value;
    var i = event.target.className;
    var commentDeleteButtonClicked = this.state.commentDeleteButtonClicked;

    helpers.deleteItem("Schedule/deleteComment/" + ScheduleItemId + "/" + commentId).then(function(){
      helpers.getItems("Schedule/getAll").then(function(ScheduleItems){
      	commentDeleteButtonClicked = false;
    	ScheduleItems.data[i].eventCommentsVisible = true;
    	console.log(ScheduleItems.data[i]);
        that.setState({
          ScheduleItems:ScheduleItems.data,
          commentDeleteButtonClicked: commentDeleteButtonClicked
        });
      });
    });
  },

  handleCommentSubmit: function(event){
    var that = this;
    var id = event.target.id;
    var i = event.target.className;
    console.log(i);
    helpers.createItem("Schedule/addComment/" + id, {
      postAuthor: that.state.postAuthor,
      postContent: that.state.postContent
    }).then(function() { 
      helpers.getItems("Schedule/getAll").then(function(ScheduleItems){
	    var Items = ScheduleItems.data;
	    Items[i].eventCommentsVisible = true;      	
        that.setState({
          ScheduleItems:Items,
          postAuthor: "",
          postContent: ""
        });
      });
    });
  },

  // handleChange: function(event) {
  // 	var that = this;
  //   var field = event.target.id
  //   this.setState({[field]: event.target.value});
  // },

  handleSearchChange: function(event) {
  	console.log(event[0]);
  	var field = event[0];
  	this.setState({searchQuery: field});
  },

  handleSearchSubmit: function(event) {
  	var that = this;
    var data = this.state.ScheduleItems;
    var query = this.props.searchQuery;
    console.log(query);
    data.map(function(item, i) {
    	if (item.eventName === query || item.eventLocation === query || item.eventDate === query || item.eventDescription === query) {
    		query = item._id;
    		console.log(query);
    	}
    });

    helpers.getItem("Schedule/getOne/" + query).then(function(Results){
      that.setState({ScheduleItems: Results.data});
    });
  },


  handleEdit: function(event) {

  },

  handleSubmit: function() {
  	location.hash = this.state.term;
  },

  handleDelete: function(){

  },

  hoverLink: function (event) {
    event.target.style.color = "pink";
  },

  unHoverLink: function(event) {
    event.target.style.color = "white";
  },

  // Here we render the function
  render: function() {
    const that = this;
    var kid;
    const children = React.Children.map(that.props.children, function(child) {
        kid = React.cloneElement(child, 
        	{
        	hoverLink: that.hoverLink, 
        	unHoverLink: that.unHoverLink,
        	//handleSubmit: that.handleSubmit,
        	//handleDelete: that.handleDelete,
        	handleSearchChange: that.handleSearchChange,
        	handleSearchSubmit: that.handleSearchSubmit,
        	handleCommentSubmit: that.handleCommentSubmit,
        	postAuthor: that.state.postAuthor,
        	postContent: that.state.postContent,
        	handleChange: that.handleChange,
        	//handleEdit: that.handleEdit,
        	ScheduleItems: that.state.ScheduleItems,
        	handleCommentButtonClick: that.handleCommentButtonClick,
        	handleCommentDeleteButtonClick: that.handleCommentDeleteButtonClick,
        	handleCommentDelete: that.handleCommentDelete,
        	//RosterEntries: that.state.RosterEntries,
        	//blogPosts: that.state.blogPosts,
        	//RosterSearchTerm: that.state.RosterSearchTerm,
        	searchQuery: that.state.searchQuery


        	});
    });

    const mainComponentStyle = {
      backgroundColor: '#00acee',
      minHeight: "700px"
    };

    const adminLinkStyle = {
      visibility: this.state.adminButtonVisibility,
      listStyleType: "none",
      display:" inline",
      padding: "0px 10px 0px 10px"
    };
    const navbarStyle = {
          backgroundColor: "transparent"
    }
    const navItemStyle = {
          listStyleType: "none",
          display: "inline",
          padding: "0px 10px 0px 10px"
    };

    const navListStyle = {
          listStyleType: "none"
    };
    const navLinkStyle = {
          color: "white",
          fontSize: "18px"
    };
    const inputFormStyle = {
          border: "1px solid #cccccc",
          width: "100%"
    };
    const searchButtonStyle = {
          backgroundColor: "#888eae",
          color:"white",
          border: "1px solid white"
    };


    return (
        <div className = "component" id = "main-component" style = {mainComponentStyle}>
              <nav className="navbar navbar-default" style = {navbarStyle}>
                <div className="container">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    
                  </div>

                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav" style = {navListStyle}>
                      <li style = {navItemStyle}><Link to="/Schedule" className="nav-link navLink" onMouseEnter = {this.hoverLink} onMouseLeave = {this.unHoverLink} style = {navLinkStyle}>Schedule </Link></li>
                      <li style = {navItemStyle}><Link to="/Roster" className="nav-link navLink navItem" onMouseEnter = {this.hoverLink} onMouseLeave = {this.unHoverLink} style = {navLinkStyle}>Roster </Link></li>
                      <li style = {navItemStyle}><Link to="/Blog" className="nav-link navLink navItem" onMouseEnter = {this.hoverLink} onMouseLeave = {this.unHoverLink} style = {navLinkStyle}>Blog </Link></li>
                      <li><a href="/logout">LogOut</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-left">
                      <li><Link to="/Admin" className="nav-link navLink adminLink" onMouseEnter = {this.hoverLink} onMouseLeave = {this.unHoverLink} style = {adminLinkStyle}>(Admin) </Link></li>
                    </ul>
                    <a className="navbar-brand navbar-right" href="#" style = {navLinkStyle}><b>Mundane Club</b></a>
                  </div>
                </div>
              </nav>
          <div className = 'container'>
            <div className = "row" id = "kidRow">
              {kid}
            </div>              
          </div>
        </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;