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
    helpers.getItems("Roster/getAll").then(function(RosterEntries){
      that.setState({RosterEntries:RosterEntries.data});
    });
  },

  handleChange: function (event) {
    var field = event.target.id;
    this.setState({[field]: event.target.value});
  },

  handleSubmit: function() {
    event.preventDefault();
    if (this.state.editButtonClicked) {
      this.setState({editButtonStyle: ""});
    }
    var that = this;
    var newEntry = { 
        _id: this.state._id,
        memberFirstName: this.state.memberFirstName, 
        memberLastName: this.state.memberLastName,
        memberInformalName: this.state.memberInformalName,
        memberFullName: this.state.memberLastName + ", " + this.state.memberFirstName + " (" + this.state.memberInformalName + ")",
        memberAddress: this.state.memberAddress,
        memberCity: this.state.memberCity,
        memberState: this.state.memberState,
        memberZip: this.state.memberZip,
        memberCellPhone: this.state.memberCellPhone,
        memberEmail: this.state.memberEmail
      };

    helpers.createItem("Roster", newEntry).then(function(){
      helpers.getItems("Roster/getAll").then(function(RosterEntries){
        that.setState({RosterEntries: RosterEntries.data}, function(){
		    that.setState({ 
		        _id: "",
		        memberFirstName: "", 
		        memberLastName: "",
		        memberInformalName: "",
		        memberAddress: "",
		        memberCity: "",
		        memberState: "",
		        memberZip: "",
		        memberCellPhone: "",
		        memberEmail: ""
		      });
        });
      });
    });
  },

  handleClear: function() {
	    this.setState({ 
	        _id: "",
	        memberFirstName: "", 
	        memberLastName: "",
	        memberInformalName: "",
	        memberAddress: "",
	        memberCity: "",
	        memberState: "",
	        memberZip: "",
	        memberCellPhone: "",
	        memberEmail: ""
	      });
  },

  handleDelete: function(event) {
    event.preventDefault();
    var that = this;
    helpers.deleteItem("Roster/delete/" + event.target.value).then(function(){
      helpers.getItems("Roster/getAll").then(function(RosterEntries){
        that.setState({RosterEntries: RosterEntries.data});
      });
    });
  },

  handleEdit: function(event) {
    event.preventDefault();
    //event.target.style.backgroundColor = "pink";
    this.setState({editButtonClicked: true});
    var that = this;
    console.log (event.target.value);
    helpers.getItem("Roster/editOne/" + event.target.value).then(function(RosterEntry){
      console.log(RosterEntry);
      var Data = RosterEntry.data[0];
      that.setState({
        _id: Data._id,
        memberFirstName: Data.memberFirstName, 
        memberLastName: Data.memberLastName,
        memberInformalName: Data.memberInformalName,
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
    if (RosterEntries.length === 0) {
      RosterEntries = [
        {memberFirstName: "Blank", 
        memberLastName: "Blank", 
        memberInformalName: "Blank",
        memberAddress: "555 North Fifth Street",
        memberCity: "Nothingville",
        memberState: "XX",
        memberZip: "XXXXX",
        memberCellPhone:"555-555-5555",
        memberEmail: "nothing@blankemail.com"
        },

        {memberFirstName: "Blank", 
        memberLastName: "Blank",
        memberInformalName: "Blank",
        memberAddress: "555 North Fifth Street",
        memberCity: "Nothingville",
        memberState: "XX",
        memberZip: "XXXXX",
        memberCellPhone:"555-555-5555",
        memberEmail: "nothing@blankemail.com"
        }
      ];
    }
    const componentStyle = {
      
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
      backgroundColor: "none",
      border: "none",
      fontSize: "18px",
      fontFamily: "Lucida Console, Courier, monospace"
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
                      <form onSubmit={this.handleSubmit} noValidate = 'novalidate'>
                        <div className="form-group">
                          <br></br>
                          <input
                            value = {this.state.memberFirstName}
                            onChange = {this.handleChange}
                            placeholder="First Name"
                            type="text"
                            className="form-control text-left"
                            id="memberFirstName"
                            required
                            style={inputStyle}
                          />
                          <input
                            value = {this.state.memberLastName}
                            onChange = {this.handleChange}
                            placeholder="Last Name"
                            type="text"
                            className="form-control text-left"
                            id="memberLastName"
                            required
                            style={inputStyle}
                          />
                          <input
                            value = {this.state.memberInformalName}
                            onChange = {this.handleChange}
                            placeholder="Informal Name"
                            type="text"
                            className="form-control text-left"
                            id="memberInformalName"
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
                            className="btn btn-default submit"
                            type="submit"
                          >
                            Submit
                          </button>
                          <button
                            className="btn btn-default clear"
                            type="reset"
                            onClick = {this.handleClear}
                          >
                            Clear
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
                        <div className = "memberEntry" key = {i}>
                          <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                              
                              <p><b>{entry.memberLastName}, {entry.memberFirstName} ({entry.memberInformalName})</b> </p>
                              <p>{entry.memberAddress}</p>
                              <p>{entry.memberCity}, {entry.memberState}</p>
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