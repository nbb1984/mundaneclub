// Include React
var React = require("react");
var Schedule = React.createClass({

  render: function() {

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

    const smallPanelStyle = {
      backgroundColor:"white",
      borderRadius: "7px"
    };

    return (
    <div className = 'row' style={componentStyle}> 
          <div className="col-lg-12">
            <div className="panel panel-primary text-left" style={inPanelStyle}>
              <br></br>
              <br></br>
              <br></br>
              <div className="panel-body">

                  <div className="panel-body text-left blog-body">
                    
                    <br></br>
                    <br></br>

                  <div className = "resultItem">
                    <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                        
                        <h3>Welcome to the Mundane Club Website!</h3>
                        <p>Click on the appropriate link in the navigation bar above to find upcoming and past events, membership lists, or to post a message on the blog!</p>
                    </div>
                    <br></br> 
                    <br></br>
                  </div>                     
                </div>
              </div>
            </div>
          </div>
    </div>
    );
  }
});

module.exports = Schedule;