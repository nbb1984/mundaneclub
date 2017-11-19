// Include React
var React = require("react");
var helpers = require("../../utils/helpers");
var RosterEdit = React.createClass({
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

    if (this.state.editButtonClicked) {
      this.setState({editButtonStyle: ""});
    }

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
    //event.target.style.backgroundColor = "pink";
    this.setState({editButtonClicked: true});
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
  },

  render: function() {
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
      width: "100%"
    };

    const memberAddressStyle = {
      fontSize: "20px"
    };

    const dateStyle = {
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
                  <h2 style = {h2style}>Roster Editing Board</h2>
                </div>
                <div className="panel-body">
                    <div className="panel-body text-left input-panel" style={inPanelStyle}>
                      <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <br></br>
                          <input
                            value = {this.state.memberName}
                            onChange = {this.handleChange}
                            placeholder="Name"
                            type="text"
                            className="form-control text-left"
                            id="memberName"
                            required
                            style={inputStyle}
                          />
                          <input
                            value = {this.state.memberAddress}
                            onChange = {this.handleChange}
                            placeholder="Address"
                            type="text"
                            className="form-control text-left"
                            id="memberAddress"
                            style={inputStyle}
                          />
                          <input
                            value = {this.state.memberCity}
                            onChange = {this.handleChange}
                            placeholder="City"
                            type="text"
                            className="form-control text-left"
                            id="memberCity"
                            required
                            style={inputStyle}
                          />
                          <input
                            value = {this.state.memberState}
                            onChange = {this.handleChange}
                            placeholder="State"
                            type="text"
                            className="form-control text-left"
                            id="memberState"
                            style={inputStyle}
                          />
                          <input
                            value = {this.state.memberZip}
                            onChange = {this.handleChange}
                            placeholder="Zip"
                            type="text"
                            className="form-control text-left"
                            id="memberZip"
                            style={inputStyle}
                          />
                          <input
                            value = {this.state.memberCellPhone}
                            onChange = {this.handleChange}
                            placeholder="Cell Phone"
                            type="text"
                            className="form-control text-left"
                            id="memberCellPhone"
                            style={inputStyle}
                          />
                          <input
                            value = {this.state.memberEmail}
                            onChange = {this.handleChange}
                            placeholder="Email"
                            type="text"
                            className="form-control text-left"
                            id="memberEmail"
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
                  {RosterEntries.map(function(entry, i) {
                      return (
                        <div className = "scheduleEntry" key = {i}>
                          <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                              
                              <p><b>{entry.memberName}</b></p>
                              <p>{entry.memberAddress}</p>
                              <p>{entry.memberCity}</p>
                              <p>{entry.memberState}</p>
                              <p>{entry.memberZip}</p>
                              <p>{entry.memberCellPhone}</p>
                              <p>{entry.memberEmail}</p>

                              <button type="button" className="btn btn-default" onClick = {that.handleEdit} value = {entry._id} style={{editButtonStyle}}>Edit</button>
                              <button type="button" className="btn btn-default" onClick = {that.handleDelete} value = {entry._id}>Delete</button>
                          
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
module.exports = RosterEdit;