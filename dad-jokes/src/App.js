import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Jokes from './components/Jokes'

function App() {
  return (
    <Router>
      <div className="App">
          <Route exact path="/registration" component={Registration} />    
          <Route exact path="/jokes" component={Jokes}></Route>
          
      </div>
    </Router>
  );
}

export default App;
