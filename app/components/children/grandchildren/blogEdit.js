// Include React
var React = require("react");
var helpers = require("../../utils/helpers");
var BlogEdit = React.createClass({
  // Here we set a generic state associated with the text being usered for
  getInitialState: function() {
    var that = this;
    return{blogPosts:[]};
  },

  componentDidMount: function() {
    var that = this;
    helpers.getItems("Blog/getAll").then(function(blogPosts){
      that.setState({blogPosts:blogPosts.data}, function(){
          console.log(blogPosts.data);
        });
    });
  },

  handleChange: function (event) {
    var field = event.target.id
    this.setState({[field]: event.target.value});

  },

  handleSubmit: function(event) {
    event.preventDefault();
    var that = this;
    var newPost = { 
        postAuthor: this.state.postAuthor, 
        postContent: this.state.postContent
      };

    helpers.createItem("Blog", newPost).then(function(){
      helpers.getItems("Blog/getAll/").then(function(blogPosts) {
         that.setState({blogPosts: blogPosts.data});
       });    
    });
  },

  handleDelete: function(event) {
    var that = this;
    helpers.deleteItem("Blog/delete/" + event.target.value).then(function(){
      helpers.getItems("Blog/getAll/").then(function(blogPosts) {
         that.setState({blogPosts: blogPosts.data});
       }); 
    });
  },

  render: function() {
    var that = this;
    var blogPosts = this.state.blogPosts ;
    if (blogPosts.length === 0) {
      blogPosts = [
        {postAuthor: "Mary", 
        postContent: "Welcome to the Blog",
        postDate:"November 13, 2017"},

        {postAuthor: "Nothing", 
        postContent: "Nothing",
        postDate:"Nothing"}];
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

    const postContentStyle = {
      fontSize: "20px"
    };

    const dateStyle = {
      color: "#888eae"
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
                <h2 style = {h2style}>Blog Editing Board</h2>
              </div>
              <div className="panel-body">
                  <div className="panel-body text-left input-panel" style={inPanelStyle}>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <br></br>
                        <input
                          value = {this.state.postAuthor}
                          onChange = {this.handleChange}
                          placeholder="Name"
                          type="text"
                          className="form-control text-left"
                          id="postAuthor"
                          required
                          style={inputStyle}
                        />
                        <input
                          value = {this.state.postContent}
                          onChange = {this.handleChange}
                          placeholder="Message"
                          type="text"
                          className="form-control text-left"
                          id="postContent"
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
                {blogPosts.map(function(item, i) {
                    return (
                      <div className = "scheduleEntry" key = {i}>
                        <div className="panel-body text-left schedule-item" style={smallPanelStyle}>
                            
                            <p><b> {item.postAuthor}</b> <span style = {dateStyle}>{item.postDate}</span></p>
                            <p style ={postContentStyle}>{item.postContent}</p>

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
module.exports = BlogEdit;