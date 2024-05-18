import './App.css';
import React, { useState } from 'react';
import Navebar from './components/Navebar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  const pagesize = 9;
  const apiKey = process.env.REACT_APP_API_KEY;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Navebar />
        <Switch>
          <Route exact path="/">
            <News setProgress={setProgress} apiKey={apiKey} key="genera" pagesize={pagesize} country="in" category="general" />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgress} apiKey={apiKey} key="entertainment" pagesize={pagesize} country="in" category="entertainment" />
          </Route>
          <Route exact path="/sports">
            <News setProgress={setProgress} apiKey={apiKey} key="sports" pagesize={pagesize} country="in" category="sports" />
          </Route>
          <Route exact path="/business">
            <News setProgress={setProgress} apiKey={apiKey} key="business" pagesize={pagesize} country="in" category="business" />
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgress} apiKey={apiKey} key="health" pagesize={pagesize} country="in" category="health" />
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgress} apiKey={apiKey} key="science" pagesize={pagesize} country="in" category="science" />
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgress} apiKey={apiKey} key="technology" pagesize={pagesize} country="in" category="technology" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
