// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var Typeahead = require('react-bootstrap-typeahead').Typeahead;

var Roster = React.createClass({
  // Here we set a generic state associated with the text being usered for
  getInitialState: function() {
    var that = this;
    return{RosterEntries:[]};
  },

  componentDidMount: function() {
    var that = this;
    helpers.getRosterEntries().then(function(RosterEntries){
      that.setState({RosterEntries:RosterEntries.data});
    });
  },

  handleChange: function (event) {
    var field = event.target.id;
    this.setState({[field]: event.target.value});
  },

  handleSubmit: function() {
    event.preventDefault();
    var that = this;
    var newEntry = { 
        _id: this.state._id,
        memberName: this.state.memberName, 
        memberAddress: this.state.memberAddress,
        memberCity: this.state.memberCity,
        memberState: this.state.memberState,
        memberZip: this.state.memberZip,
        memberCellPhone: this.state.memberCellPhone,
        memberEmail: this.state.memberEmail
      };
    helpers.createRosterEntry(newEntry).then(function(){
      helpers.getRosterEntries().then(function(RosterEntries){
        that.setState({RosterEntries: RosterEntries.data});
      });
    });
  },

  handleDelete: function(event) {
    event.preventDefault();
    var that = this;
    helpers.deleteRosterEntry(event.target.value).then(function(){
      helpers.getRosterEntries().then(function(RosterEntries){
        that.setState({RosterEntries: RosterEntries.data});
      });
    });
  },

  handleEdit: function(event) {
    event.preventDefault();
    var that = this;
    helpers.getRosterEntry(event.target.value).then(function(RosterEntry){
      var Data = RosterEntry.data[0];
      that.setState({
        _id: Data._id,
        memberName: Data.memberName, 
        memberAddress: Data.memberAddress,
        memberCity: Data.memberCity,
        memberState: Data.memberState,
        memberZip: Data.memberZip,
        memberCellPhone: Data.memberCellPhone,
        memberEmail: Data.memberEmail
      });
    });
    this.props.scrollUp();
  },

  render: function() {
    var typeaheadOptions = [];
    this.state.RosterEntries.map(function(Item){
      typeaheadOptions.push(Item.memberName);        
    });

    var that = this;
    var RosterEntries = this.state.RosterEntries;
    console.log(RosterEntries);
    if (RosterEntries.length === 0) {
      RosterEntries = [
        {memberName: "Blank", 
        memberAddress: "555 North Fifth Street 55555",
        memberCity: "Nothingville",
        memberState: "XX",
        memberZip: "XXXXX",
        memberCellPhone:"555-555-5555",
        memberEmail: "nothing@blankemail.com"
        },

        {memberName: "Blank", 
        memberAddress: "555 North Fifth Street 55555",
        memberCity: "Nothingville",
        memberState: "XX",
        memberZip: "XXXXX",
        memberCellPhone:"555-555-5555",
        memberEmail: "nothing@blankemail.com"
        }
      ];
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

    const memberAddressStyle = {
      fontSize: "20px"
    };

    const dateStyle = {
      color: "#888eae"
    };

    const searchButtonStyle = {
      backgroundColor: "#888eae",
      color: "white"
    };

    const searchStyle = {
      width: "50%",
      margin: "0px 0px 0px 2.5%",
    };

    return (
      <div className = 'row' style={componentStyle}> 
            <div className="col-lg-12">
              <div className="panel panel-primary text-left" style={inPanelStyle}>
                <br></br>
                <br></br>
                <div className="panel-heading" style={panelHeadingStyle}>
                  <h2>Mundane Club Roster</h2>
                </div>
                <br></br>
                <form style = {searchStyle}>
                  <div className="form-group">
                    <Typeahead options={typeaheadOptions} placeholder="Search for Mundane Club Members"/>
                  </div>
                  <button type="submit" className="btn btn-default" style = {searchButtonStyle} onMouseEnter = {this.props.hoverLink} onMouseLeave = {this.props.unHoverLink}>Submit</button>
                </form>
                <div className="panel-body">
                    <div className="panel-body text-left blog-body">
                      
                      <br></br>
                      <br></br>
                  {RosterEntries.map(function(entry, i) {
                      return (
                        <div className = "rosterEntry" key = {i}>
                          <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                              
                              <p><b>Name:</b>{entry.memberName}</p>
                              <p><b>Address:</b>{entry.memberAddress}</p>
                              <p><b>City, State:</b>{entry.memberCity}, {entry.memberState}</p>
                              <p><b>Zip:</b>{entry.memberZip}</p>
                              <p><b>Cell Phone:</b>{entry.memberCellPhone}</p>
                              <p><b>Email:</b>{entry.memberEmail}</p>
                          
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
module.exports = Roster;