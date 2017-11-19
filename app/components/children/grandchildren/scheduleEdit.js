// Include React
var React = require("react");
var helpers = require("../../utils/helpers");
var ScheduleEdit = React.createClass({
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
    helpers.getScheduleItems().then(function(ScheduleItems){
      that.setState({ScheduleItems:ScheduleItems.data});
    });
  },

  handleChange: function (event) {
    var field = event.target.id
    this.setState({[field]: event.target.value});

  },

  handleSubmit: function() {
    var that = this;
    var newScheduleItem = { 
        eventName: this.state.eventName, 
        eventLocation: this.state.eventLocation,
        googleMapsUrl: this.state.googleMapsUrl,
        eventDate: this.state.eventDate,
        formattedEventDate: this.state.formattedEventDate,
        eventTime: this.state.eventTime,
        eventDescription: this.state.eventDescription      
      };

    helpers.createScheduleItem(newScheduleItem).then(function(){
      helpers.getScheduleItems().then(function(ScheduleItems){
        console.log(ScheduleItems.data);
          that.setState({ScheduleItems:ScheduleItems.data});
      });
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

  handleEdit: function(event) {
    event.preventDefault();
    var that = this;
    console.log(event.target.value);
    helpers.getScheduleItem(event.target.value).then(function(Item){
      console.log(Item.data[0]);
      var Data = Item.data[0];
      that.setState({
        _id: Data._id,
        eventName: Data.eventName, 
        eventLocation: Data.eventLocation,
        googleMapsUrl: Data.googleMapsUrl,
        eventDate: Data.eventDate,
        formattedEventDate: Data.formattedEventDate,
        eventTime: Data.eventTime,
        eventDescription: Data.eventDescription
      });
    });
  },

  render: function() {
    var that = this;
    var ScheduleItems = this.state.ScheduleItems;
    console.log(ScheduleItems);
    if (ScheduleItems.length === 0) {
      ScheduleItems = [
        {eventName: "Nothing", 
        location: "Nothing",
        googleMapsUrl: "maps.google.com",
        eventDate: "October 8, 2010",
        eventTime: "12:00 p.m.",
        description:"Fun" },

        {eventName: "Nothing", 
        location: "Nothing",
        googleMapsUrl: "maps.google.com",
        eventDate: "October 8, 2010",
        eventTime: "12:00 p.m.",
        description:"Fun" }];
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
                <h2 style = {h2style}>Schedule Editing Board</h2>
              </div>
              <div className="panel-body">
                  <div className="panel-body text-left input-panel" style={inPanelStyle}>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <br></br>
                        <input
                          value = {this.state.eventName}
                          onChange = {this.handleChange}
                          placeholder="Event Name"
                          type="text"
                          className="form-control text-left"
                          id="eventName"
                          required
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.eventLocation}
                          onChange = {this.handleChange}
                          placeholder="Location"
                          type="text"
                          className="form-control text-left"
                          id="eventLocation"
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.googleMapsUrl}
                          onChange = {this.handleChange}
                          placeholder="googleMapsUrl"
                          type="text"
                          className="form-control text-left"
                          id="googleMapsUrl"
                          required
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.eventDate}
                          onChange = {this.handleChange}
                          placeholder="Date"
                          type="text"
                          className="form-control text-left"
                          id="eventDate"
                          required
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.formattedEventDate}
                          onChange = {this.handleChange}
                          placeholder="Formatted Date (eg. 2015-03-25)"
                          type="text"
                          className="form-control text-left"
                          id="formattedEventDate"
                          required
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.eventTime}
                          onChange = {this.handleChange}
                          placeholder="Time"
                          type="text"
                          className="form-control text-left"
                          id="eventTime"
                          required
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.eventDescription}
                          onChange = {this.handleChange}
                          placeholder="Description"
                          type="text"
                          className="form-control text-left"
                          id="eventDescription"
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

                  <br></br> 
                  <br></br>

                  <div className="panel-body text-left blog-body">
                    
                    <br></br>
                    <br></br>
                {ScheduleItems.map(function(item, i) {
                    return (
                      <div className = "scheduleEntry" key = {i}>
                        <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                            
                            <p><b>Event Name:</b> {item.eventName}</p>
                            <p><b>Location:</b>{item.eventLocation} <a href = {item.googleMapsUrl}>Directions On Google Maps</a></p>
                            <p><b>Date:</b>{item.eventDate}</p>
                            <p><b>Time:</b>{item.eventTime}</p>
                            <p><b>Description:</b>{item.eventDescription}</p>

                            <button type="button" className="btn btn-default" onClick = {that.handleEdit} value = {item._id}>Edit</button>
                            <button type="button" className="btn btn-default" onClick = {that.handleDelete} value = {item._id}>Delete</button>                            
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