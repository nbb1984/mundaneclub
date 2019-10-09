// Include React
var React = require("react");
var helpers = require("../utils/helpers");

var Schedule = React.createClass({

  getInitialState: function() {
    return{WelcomeItems:[], AnnouncementItems:[]}
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

  render: function() {
    var that = this;
    var WelcomeMessages = this.state.WelcomeItems;
    var WelcomeAnnouncements = this.state.AnnouncementItems;
    
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

    const h2Style = {
      color: "white",
      margin: "0px 0px 0px 10px"
    };

    return (
    <div className = 'row' style={componentStyle}> 
          <div className="col-lg-12">
            <div className="panel panel-primary text-left" style={inPanelStyle}>           
              <div className="panel-body">
                  <div className="panel-body text-left blog-body">
                  
                    {WelcomeMessages.map(function(item, i) {
                        return (
                          <div className = "WelcomeEntry" key = {i}>
                            <br></br>
                            <br></br>
                            <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                                
                                <h3>{item.welcomeHeading}</h3>
                                <p>{item.welcomeMessage}</p>
                                
                            </div>
                            <br></br> 
                            <br></br>
                          </div>                
                        );
                      })}  
                    </div>                     

                <div className= "col-md-6">

                  <h2 style = {h2Style}> Announcements</h2>
                  <br></br>
                {WelcomeAnnouncements.map(function(item, i) {
                    return (
                      <div className = "AnnouncementEntry">
                        <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                  
                            <p>{item.announcementMessage}</p>

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

module.exports = Schedule;