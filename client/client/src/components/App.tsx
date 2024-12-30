import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MapPage from './MapPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to the App</h1>
        <Link to="/map">
          <button>Go to Map</button>
        </Link>
        <Switch>
          <Route path="/map" component={MapPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;