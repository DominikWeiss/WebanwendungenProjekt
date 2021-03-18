import React from 'react'; // provides all the core functionality
import ReactDOM from 'react-dom'; // provides the functionality for loading our application into the browser
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
  // BrowserRouter implements the URL-based routing
  // Route and Switch components are used to actually define the route structure
  // Link component is used to generate links to the routes
import { Provider } from "react-redux";

import AriaMenu from './components/aria-menu.jsx';
import Login from './routes/login.jsx'; // include Login
import Modules from './routes/modules.jsx'; // include Modules
import Calculator from './routes/calculator.jsx'; // include Modules
import store from './store.jsx';
import '../styles/app.scss'; // include styling

// JSX is a JavaScript eXtension that enables the easy inclusion of templating into our JavaScript components

export default class Athena extends React.Component { // main functionality

    constructor(props) {
        super(props);
    }

    /**
     * Render the component
     */
    render() {
        return ( // round brakets for using JSX in the JavaScript
            // instead of class you must always use className
            // all attributes need to be camel-cased (tabindex becomes tabIndex)
          <Provider store={store}>
          <Router>
            <div>
            <header className="grid-x">
                <div className="top-bar-left">
                  <AriaMenu label="Main" class="horizontal">
                    <li className="menu-text">Athena - Study Portal</li>
                    <li><Link to="/modules" role="menuitem" tabIndex="0">My Modules</Link></li>
                    <li><Link to="/calculator" role="menuitem" tabIndex="1">Calculator</Link></li>
                    <li><a href="" role="menuitem" tabIndex="-1">My Exams</a></li>
                  </AriaMenu>
                </div>
                <div className="top-bar-right">
                  <AriaMenu label="User" class="horizontal">
                    <li><Link to="/login" role="menuitem" tabIndex="0">Login</Link></li>
                    <li><a href="login.html" role="menuitem" tabIndex="-1">Logout</a></li>
                  </AriaMenu>
                </div>
            </header>

            <main className="grid-container-x small callout"> 
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/modules" component={Modules} />
                <Route path="/calculator" component={Calculator} />
              </Switch>
            </main>

            <footer>
              &copy; 2018 - Mark Hall (<a href="mailto:mark.hall@informatik.uni-halle.de" tabIndex="0">mark.hall@informatik.uni-halle.de</a>)
            </footer>
            </div>
          </Router>
          </Provider>
        );
    }
}

ReactDOM.render(<Athena/>, document.getElementById('app-entry-point'));