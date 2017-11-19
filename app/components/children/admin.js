// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var Link = require("react-router").Link;

var Admin = React.createClass({
  componentWillMount: function(){
    console.log(this.props);
  },

  render: function() {

    const rowStyle = {
      fontSize: "17px"
    }
    const navbarStyle = {
      margin: "20px 0px 0px 0px",
      backgroundColor: "none",
      width: "100%"
    }

    const navItemStyle = {
      listStyleType: "none",
      display: 'inline'
    }

    const navLinkStyle = {
      color: "#f67c37"
    }
    const linkListStyle = {
      display: 'inline'
    }

    const adminButtonStyle = {
      borderRadius: "20px"
    }

    return (
            <div className="row" id = "childRow" style={rowStyle}>
              <div className = "container">
                  <ul className = "linkList" style = {linkListStyle}>
                    <br></br>

                    <button style = {adminButtonStyle}>
                      <li className="nav-item" style = {navItemStyle}>
                          <Link to="/Admin/ScheduleEdit" className="nav-link" style = {navLinkStyle}>Edit Schedule </Link>
                      </li>
                    </button>

                    <br></br>
                    <br></br>

                    <button style = {adminButtonStyle}>
                      <li className="nav-item" style = {navItemStyle}>
                          <Link to="/Admin/RosterEdit" className="nav-link" style = {navLinkStyle}>Edit Roster </Link>
                      </li>
                    </button>

                    <br></br>
                    <br></br>

                    <button style = {adminButtonStyle}>                    
                      <li className="nav-item" style = {navItemStyle}>
                          <Link to="/Admin/BlogEdit" className="nav-link" style = {navLinkStyle}>Edit Blog </Link>
                      </li>
                    </button>

                    <br></br>
                  </ul>
              </div>
              <div className = 'row'>{this.props.children}</div>
            </div>
    );
  }
});

module.exports = Admin;