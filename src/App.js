import React, { Component } from 'react';

import './App.css';

import { Todo } from './components/Todo'

class App extends Component {

  render() {

    return (
        <div className="App">
          <Todo />
          <Todo myColor="green"/>
          <Todo myColor="red"/>
        </div>
    );
  }
}

export default App;
