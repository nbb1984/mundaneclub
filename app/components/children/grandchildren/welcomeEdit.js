// Include React
var React = require("react");
var helpers = require("../../utils/helpers");
var ScheduleEdit = React.createClass({
  // Here we set a generic state associated with the text being usered for
  getInitialState: function() {
    var that = this;
    return{WelcomeItems:[], AnnouncementItems:[], welcomeHeading: "", welcomeMessage: "", Announcement: ""}
  },

  componentDidMount: function() {
    var that = this;
    helpers.getItems("Welcome/getAll").then(function(Items){
      that.setState({WelcomeItems:Items.data});
    });
    helpers.getItems("Announcements/getAll").then(function(Items){
      that.setState({AnnouncementItems:Items.data});
    });    
  },

  handleChange: function (event) {
    var field = event.target.id
    this.setState({[field]: event.target.value});

  },

  handleSubmit: function() {
    var that = this;
    var newWelcomeItem = { 
        _id: this.state._id,
        welcomeHeading: this.state.welcomeHeading,
        welcomeMessage: this.state.welcomeMessage     
      };

    helpers.createItem("Welcome", newWelcomeItem).then(function(){
      helpers.getItems("Welcome/getAll").then(function(WelcomeItems){
          that.setState({WelcomeItems:WelcomeItems.data});
      });
    });
  },

  handleSubmitAnnouncement: function() {
    var that = this;
    var newAnnouncement = {
        _id: this.state._id, 
        Announcement: this.state.Announcement
      };

    helpers.createItem("Announcements", newAnnouncement).then(function(){
      helpers.getItems("Announcements/getAll").then(function(AnnouncementItems){
        console.log(AnnouncementItems + "hello");
          that.setState({
            AnnouncementItems:AnnouncementItems.data,
            Announcement: ""
          });
      });
    });
  },

  handleDelete: function(event) {
    console.log(event.target);
    var that = this;
    helpers.deleteItem("Welcome/delete/" + event.target.value).then(function(){
      helpers.getItems("Welcome/getAll").then(function(Items){
          that.setState({WelcomeItems:Items.data});
      });
    });
  },

  handleDeleteAnnouncement: function(event) {
    var that = this;
    helpers.deleteItem("Announcements/delete/" + event.target.value).then(function() {
      helpers.getItems("Announcements/getAll").then(function(Items){
        that.setState({AnnouncementItems: Items.data});
      });
    });
  },

  handleEditWelcome: function(event) {
    event.preventDefault();
    var that = this;
    helpers.getItem("Welcome/getOne/" + event.target.value).then(function(Item){
      var Data = Item.data[0];
      that.setState({
        _id: Data._id,
        welcomeHeading: Data.welcomeHeading,
        welcomeMessage: Data.welcomeMessage
      });
    });
  },

  handleEditAnnouncement: function(event) {
    event.preventDefault();
    var that = this;
    helpers.getItem("Announcements/getOne/" + event.target.value).then(function(Item){
      var Data = Item.data[0];
      that.setState({
        _id: Data._id,
        Announcement: Data.Announcement
      });
    });
  },

  render: function() {
    var that = this;
    var WelcomeMessages = this.state.WelcomeItems;
    var WelcomeAnnouncements = this.state.AnnouncementItems;
    console.log(WelcomeAnnouncements);
    if (WelcomeMessages.length === 0) {
      WelcomeMessages = [{
        welcomeHeading: "Welcome to the Mundane Club Website!",
        welcomeMessage: "Click on the appropriate link in the navigation bar above to find upcoming and past events, membership lists, or to post a message on the blog."
      }]
    }

    if (WelcomeAnnouncements.length == 0) {
      WelcomeAnnouncements = [{
        Announcement: "There are no Announcements to make at this time."
      }]
    }

    const componentStyle = {
      fontFamily: "font-family: Lucida Console, Courier, monospace"
    };

    const inPanelStyle = {
      backgroundColor:"transparent",
      border: "none"
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

    const inputStyle = {
      border: "1 px solid #cccccc",
      width: "100%",
    };    

    const h2style = {
      color: "white",
      textShadow: "2px 2px #cccccc"
    };

    return (
    <div className = 'row' style={componentStyle}> 
          <div className="col-lg-12">
            <div className="panel panel-primary text-left" style={inPanelStyle}>
              <br></br>
              <br></br>
              <div className="panel-heading" style={panelHeadingStyle}>
                <h2 style = {h2style}>Wecome Page Editing Board</h2>
              </div>
              <div className="panel-body">
                  <div className="panel-body text-left input-panel" style={inPanelStyle}>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <br></br>
                        <input
                          value = {this.state.welcomeHeading}
                          onChange = {this.handleChange}
                          placeholder="Welcome Heading"
                          type="text"
                          className="form-control text-left"
                          id="welcomeHeading"
                          required
                          style={inputStyle}
                        />
                        <textarea
                          value = {this.state.welcomeMessage}
                          onChange = {this.handleChange}
                          placeholder="Welcome Message"
                          type="text"
                          className="form-control text-left"
                          id="welcomeMessage"
                          required
                          style={inputStyle}
                        />
                        <br />
                        <button
                          className="btn btn-default blue"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="panel-body text-left input-panel" style={inPanelStyle}>
                    <form onSubmit={this.handleSubmitAnnouncement}>
                      <div className="form-group">
                        <br></br>
                        <textarea
                          value = {this.state.Announcement}
                          onChange = {this.handleChange}
                          placeholder="Post New Announcement Here"
                          type="text"
                          className="form-control text-left"
                          id="Announcement"
                          style={inputStyle}
                        />
                        <br />
                        <button
                          className="btn btn-default blue"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>

                  <br></br> 
                  <br></br>

                  <div className="panel-body text-left blog-body">
                    
                    <br></br>
                    <br></br>
                <h3 style= {h2style}>Welcome Messages</h3>
                {WelcomeMessages.map(function(item, i) {
                    return (
                      <div className = "scheduleEntry" key = {i}>
                        <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                  
                            <p>{item.welcomeMessage}</p>

                            <button type="button" className="btn btn-default" onClick = {that.handleEdit} value = {item._id}>Edit</button>
                            <button type="button" className="btn btn-default" onClick = {that.handleDelete} value = {item._id}>Delete</button>                            
                        </div>
                        <br></br> 
                        <br></br>
                      </div>                
                    );
                  })}  
                <h3 style = {h2style}>Announcements</h3>
                {WelcomeAnnouncements.map(function(item, i) {
                    return (
                      <div className = "AnnouncementEntry" key = {i}>
                        <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                  
                            <p>{item.announcementMessage}</p>

                            <button type="button" className="btn btn-default" onClick = {that.handleEdit} value = {item._id}>Edit</button>
                            <button type="button" className="btn btn-default" onClick = {that.handleDeleteAnnouncement} value = {item._id}>Delete</button>                            
                        </div>
                        <br></br> 
                        <br></br>
                      </div>                
                    );
                  })}                              
                </div>
              </div>
            </div>
          </div>
    </div>
    );
  }
});

module.exports = ScheduleEdit;