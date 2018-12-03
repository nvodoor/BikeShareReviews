import React from 'react';
import Header from './UI/Header.jsx';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './app.css';
import About from './About.jsx';
import Reviews from './Reviews.jsx';
import Maps from './Maps.jsx';
import Login from './Login.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/maps" component={Maps} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Reviews} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;