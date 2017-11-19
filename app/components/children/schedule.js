// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var Typeahead = require('react-bootstrap-typeahead').Typeahead;
var Schedule = React.createClass({
  // Here we set a generic state associated with the text being usered for
  getInitialState: function() {
    var that = this;
    return{ScheduleItems:[], eventName: "this.state.eventName", 
        eventLocation: 'this.state.eventLocation',
        googleMapsUrl: 'this.state.googleMapsUrl',
        eventDate: 'this.state.eventDate',
        eventTime: 'this.state.eventTime',
        eventDescription: 'this.state.eventDescription'};
  },

  componentDidMount: function() {
    var that = this;
    //console.log(Typeahead);
    helpers.getScheduleItems().then(function(ScheduleItems){
      that.setState({ScheduleItems:ScheduleItems.data});
    });
  },

  handleChange: function (event) {
    var field = event.target.id
    this.setState({searchTerm: event.target.value});
  },

  handleSubmit: function(event) {
    var data = this.state.ScheduleItems;
    var query = event.target.value;
    for (var i = 0; i++ ; i < data.length) {
      if (data[i].eventName == query || data[i].eventLocation == query || data[i].eventDate == query || data[i].eventDescription == query) {
        query = data[i]._id;
      }
    }

    helpers.runQuery("schedule", query).then(function(Results){
      that.setState({Results: Results.data});
    });
  },

  handleDelete: function(event) {
    console.log(event.target);
    var that = this;
    helpers.deleteScheduleItem(event.target.value).then(function(ScheduleItems){
      helpers.getScheduleItems().then(function(ScheduleItems){
        console.log(ScheduleItems.data);
          that.setState({ScheduleItems:ScheduleItems.data});
      });
    });
  },

  render: function() {
    var typeaheadOptions = [];
    this.state.ScheduleItems.map(function(Item){
      typeaheadOptions.push(Item.eventName, Item.eventLocation, Item.eventDate);        
    });

    var that = this;
    var ScheduleItems = this.state.ScheduleItems;
    var SearchResults = this.state.searchResults;
    if (ScheduleItems.length === 0) {
      ScheduleItems = [
        {eventName: "Nothing", 
        location: "Nothing",
        googleMapsUrl: "maps.google.com",
        date: "October 8, 2010",
        time: "12:00 p.m.",
        description:"Fun" },

        {eventName: "Nothing", 
        location: "Nothing",
        googleMapsUrl: "maps.google.com",
        date: "October 8, 2010",
        time: "12:00 p.m.",
        description:"Fun" }];
    }

    if (!SearchResults) {
      SearchResults = [];
    }

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

    const inputPanelStyle = {
      backgroundColor:"transparent",
      border: "none",
      visibility: "hidden"      
    };

    const smallPanelStyle = {
      backgroundColor:"white",
      borderRadius: "7px"
    };

    const inputStyle = {
      border: "1 px solid #cccccc",
      width: "100%"
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
                <h2>Mundane Club Schedule</h2>
              </div>
              <br></br>
                <form style = {searchStyle}>
                  <div className="form-group">
                    <Typeahead options={typeaheadOptions} placeholder="Search for Events by EventName, Location, or Date"/>
                    {/*<Typeahead options={this.state.typeaheadOptions} className = "form-control" maxVisible={4} placeholder = "Search for an Event" style = {searchStyle}/>*/}
                  </div>
                  <button type="submit" className="btn btn-default" style = {searchButtonStyle} onMouseEnter = {this.props.hoverLink} onMouseLeave = {this.props.unHoverLink}>Submit</button>
                </form>

              <div className="panel-body">

                  <div className="panel-body text-left blog-body">
                    
                    <br></br>
                    <br></br>
                {SearchResults.map(function(item, i) {
                    return (
                      <div className = "resultItem" key = {i}>
                        <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                            
                            <p><b>Event Name:</b> {item.eventName}</p>
                            <p><b>Location:</b>{item.eventLocation} <a href = {item.googleMapsUrl}>Directions On Google Maps</a></p>
                            <p><b>Date:</b>{item.eventDate}</p>
                            <p><b>Time:</b>{item.eventTime}</p>
                            <p><b>Description:</b>{item.eventDescription}</p>
                        </div>
                        <br></br> 
                        <br></br>
                      </div>                
                    );
                })}    

                {ScheduleItems.map(function(item, i) {
                    return (
                      <div className = "scheduleItem" key = {i}>
                        <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                            
                            <p><b>Event Name:</b> {item.eventName}</p>
                            <p><b>Location:</b>{item.eventLocation} <a href = {item.googleMapsUrl}>Directions On Google Maps</a></p>
                            <p><b>Date:</b>{item.eventDate}</p>
                            <p><b>Time:</b>{item.eventTime}</p>
                            <p><b>Description:</b>{item.eventDescription}</p>
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