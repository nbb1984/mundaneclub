// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var Typeahead = require('react-bootstrap-typeahead').Typeahead;

var Roster = React.createClass({
    // Here we set a generic state associated with the text being usered for
    getInitialState: function() {
        var that = this;
        return { RosterEntries: [] };
    },

    componentDidMount: function() {
        var that = this;
        helpers.getItems("Roster/getAll").then(function(RosterEntries) {
            that.setState({
              RosterEntries: RosterEntries.data, 
              RosterEntriesVisible: RosterEntries.data
            });
        });
    },

    enterSearch: function() {
      var that = this;
      var data = this.state.RosterEntries;
      var query = this.state.searchQuery[0];
      data.map(function(item, i) {
        if (item.memberFullName === query) {
          query = item._id;
          console.log(query);
        }
    });

    helpers.getItem("Roster/getOne/" + query).then(function(SearchResults){
      console.log(SearchResults);
      that.setState({RosterEntriesVisible: SearchResults.data});
    });
    },

    handleChange: function(event) {
        this.setState({ searchQuery: event });
    },

    render: function() {
        var typeaheadOptions = [];
        var that = this;
        var RosterEntries = [{
            memberFirstName: "Blank",
            memberLastName: "Blank",
            memberAddress: "555 North Fifth Street 55555",
            memberCity: "Nothingville",
            memberState: "XX",
            memberZip: "XXXXX",
            memberCellPhone: "555-555-5555",
            memberEmail: "nothing@blankemail.com"
        }];

        var RosterEntriesVisible = [{
            memberFirstName: "Blank",
            memberLastName: "Blank",
            memberAddress: "555 North Fifth Street 55555",
            memberCity: "Nothingville",
            memberState: "XX",
            memberZip: "XXXXX",
            memberCellPhone: "555-555-5555",
            memberEmail: "nothing@blankemail.com"
        }];

        if (this.state.RosterEntriesVisible) {
           RosterEntriesVisible= this.state.RosterEntriesVisible;
        }
        if (this.state.RosterEntries) {
           RosterEntries= this.state.RosterEntries;
        }

        RosterEntries = this.state.RosterEntries;

        RosterEntries.map(function(Item) {
            typeaheadOptions.push(Item.memberLastName + ", " + Item.memberFirstName + " (" + Item.memberInformalName + ")");
        });
        console.log(RosterEntriesVisible);

        const componentStyle = {
            fontFamily: "font-family: Lucida Console, Courier, monospace"
        };
        const inPanelStyle = {
            backgroundColor: "transparent",
            border: "none"
        };

        const panelHeadingStyle = {
            margin: "0px 0px 0px 15px",
            backgroundColor: "transparent",
            border: "none"
        };

        const smallPanelStyle = {
            backgroundColor: "white",
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
            backgroundColor: "#3ae693",
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
                    <Typeahead options={typeaheadOptions} placeholder="Search for Mundane Club Members" onChange = {this.handleChange}/>
                  </div>
                  <button type="submit" className="btn btn-default" style = {searchButtonStyle} onClick = {that.enterSearch} value = {this.state.searchQuery} onMouseEnter = {this.props.hoverLink} onMouseLeave = {this.props.unHoverLink}>Submit</button>
                </form>
                <div className="panel-body">
                    <div className="panel-body text-left blog-body">
                      
                      <br></br>
                      <br></br>
                  {RosterEntriesVisible.map(function(entry, i) {
                      return (
                        <div className = "memberEntry" key = {i}>
                          <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                              
                              <p><b>{entry.memberLastName}, {entry.memberFirstName} ({entry.memberInformalName})</b> </p>
                              <p>{entry.memberAddress}</p>
                              <p>{entry.memberCity} {entry.memberState}</p>
                              <p>{entry.memberZip}</p>
                              <p>{entry.memberCellPhone}</p>
                              <p>{entry.memberEmail}</p>
                          
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