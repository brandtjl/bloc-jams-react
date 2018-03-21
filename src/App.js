import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import {Jumbotron} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <ul>
            <li><Link to='/'>Landing</Link></li>
            <li><Link to='/library'>Library</Link></li>
            </ul>
          </nav>
          <Jumbotron>
          <h1>Bloc Jams</h1>
          </Jumbotron>
        </header>
        <main> {/*Route components with path and component props */}    
              
          <Route exact path = "/" component = {Landing} />  {/* this isn't saying 'set equal to' */}
          <Route path = "/library" component = {Library} /> {/* but is saying 'if path equals' */}
          <Route path = "/album/:slug" component = {Album} />
        </main>

      </div>
    );
  }
}

export default App;
