import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import Home from './containers/Home/Home';
import Movie from './containers/Movie/Movie';

import './App.css';

class App extends Component {
   render() {
      return (
         <div className="App">
            <Header />
            <Switch>
               <Route path="/" exact component={Home} />
               <Route path="/:movieId" exact component={Movie} />
               <Route component={NotFound} />
            </Switch>
         </div>
      );
   }
}

export default App;
