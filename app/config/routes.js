// Inclue the React library
var React = require("react");
// Include the react-router module
var router = require("react-router");
// Include the Route component for displaying individual routes
var Route = router.Route;
// Include the Router component to contain all our Routes
// Here where we can pass in some configuration as props
var Router = router.Router;
// Including router.Redirect so that we can change pages after certain conditions are met.
var Redirect = router.Redirect;

// Include the hashHistory prop to handle routing client side without a server
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
var hashHistory = router.hashHistory;
// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;
// Reference the high-level components
var Main = require("../components/main");
var Schedule = require("../components/children/schedule");
var Roster = require("../components/children/roster");
var Blog = require("../components/children/blog");
var Admin = require("../components/children/admin");
var BlogEdit = require("../components/children/grandchildren/blogEdit");
var ScheduleEdit = require("../components/children/grandchildren/scheduleEdit");
var RosterEdit = require("../components/children/grandchildren/rosterEdit");







    
module.exports= (
        <Router history={hashHistory}>
          <Route path="/" component={Main}>
            {/* If user selects one of the links in the navbar then show the appropriate component*/}
            <Route path="Schedule" component={Schedule}/>
            <Route path="Roster" component={Roster}/>
            <Route path="Blog" component={Blog}/>
            <Route path="Admin" component={Admin}>
                <Route path="BlogEdit" component={BlogEdit}/>
                <Route path="ScheduleEdit" component={ScheduleEdit}/>
                <Route path="RosterEdit" component={RosterEdit}/>
                <IndexRoute component={ScheduleEdit} />
            </Route>

            
            <IndexRoute component={Schedule} />
            {/* If user selects any other path... we get the Schedule Route */}
            
          </Route>
        </Router>
      ); 
      
