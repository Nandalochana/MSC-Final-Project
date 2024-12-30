import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './HomePage';
import MapPage from './MapPage';
import '../css/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/map" component={MapPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;