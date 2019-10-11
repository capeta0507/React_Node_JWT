import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer'
import Home from './components/home'
import About from './components/about'
import Login from './components/login'
import Data from './components/data'
import './App.css';

class App extends Component {
  render(){
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' render={() => (
                <About />
              )}/>
              <Route exact path='/login' render={({history}) => (
                <Login onHistory={history}/>
              )}/>
              <Route exact path='/data' render={() => (
                <Data />
              )}/>
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
        
      </>
    );
  }
}

export default App;
