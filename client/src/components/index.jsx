<<<<<<< HEAD
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Learn from './Learn';
import About from './About';
import Profile from './Profile';
import Game from './LiveGame';

=======
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Learn from "./Learn";
import About from "./About";
import Profile from "./Profile";
import Game from "./LiveGame";
import Chat from "./LiveGame/chat";
>>>>>>> made chatbox
const App = () => (
  <div id="page">
    <Nav />
    <Chat />
    <div className="main">
      <Switch>
        <Route path="/learn" component={Learn} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
        <Route path="/game" component={Game} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  </div>
);
export default App;
