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
    helpers.getUser().then(function(user) {
      if (user.data.makeAdminVisible) {
        this.setState({adminButtonVisibility: "visible"});
      }
    })
  },

  handleChange: function(event) {
    this.setState({term: event.target.value});
  },

  handleSubmit: function(event) {
    helpers.runQuery(this.state.term).then(function(results){

    })
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
        kid = React.cloneElement(child, {scrollUp: that.scrollUp, hoverLink: that.hoverLink, unHoverLink: that.unHoverLink});
    });

    const mainComponentStyle = {
      backgroundImage: 'url("../images/cleveland.jpg")',
      minHeight: "700px"
    };

    const rowStyle = {
      fontSize: "17px",
      border:"1px solid white"
    };

    const navbarStyle = {
      backgroundColor: "transparent"
    };

    const navItemStyle = {
      listStyleType: "none",
      display: 'inline',
      padding: "0px 10px 0px 10px",
    };

    const navLinkStyle = {
      color: "white",
      fontSize: "17px"
    };

    const linkListStyle = {
      display: 'inline'
    };

    const adminStyle = {
      listStyleType: "none",
      textAlign: 'right'
    };

    const inputStyle = {
      border: "1 px solid #cccccc",
      width: "100%",
    };

    const searchButtonStyle = {
      backgroundColor: "transparent",
      color: "white"
    };

    const adminLinkStyle = {
      listStyleType: "none",
      display: 'inline',
      padding: "0px 10px 0px 10px",
      //visibility: this.state.adminButtonVisibility
    };

    return (
        <div className = "component" id = "main-component" style = {mainComponentStyle}>
              <nav className="navbar navbar-default"   style = {navbarStyle}>
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
                    <ul className="nav navbar-nav" >
                      <li><Link to="/Schedule" className="nav-link" style = {navLinkStyle} onMouseEnter = {this.hoverLink} onMouseLeave = {this.unHoverLink}>Schedule </Link></li>
                      <li style = {navItemStyle}><Link to="/Roster" className="nav-link" style = {navLinkStyle} onMouseEnter = {this.hoverLink} onMouseLeave = {this.unHoverLink}>Roster </Link></li>
                      <li style = {navItemStyle}><Link to="/Blog" className="nav-link" style = {navLinkStyle} onMouseEnter = {this.hoverLink} onMouseLeave = {this.unHoverLink}>Blog </Link></li>
                      <li style = {navItemStyle}><a href="/logout">LogOut</a></li>
                    </ul>
                    <form className="navbar-form navbar-left">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search Mundane Club" onChange = {this.handleChange}></input>
                      </div>
                      <button type="submit" className="btn btn-default" style = {searchButtonStyle} onMouseEnter = {this.hoverLink} onMouseLeave = {this.unHoverLink}>Submit</button>
                    </form>
                    <a className="navbar-brand" href="#" style = {navLinkStyle}><b>Mundane Club</b></a>
                    <ul className="nav navbar-nav navbar-right">
                      <li style = {adminLinkStyle}><Link to="/Admin" className="nav-link" style = {navLinkStyle} onMouseEnter = {this.hoverLink} onMouseLeave = {this.unHoverLink}>Admin </Link></li>
                    </ul>
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