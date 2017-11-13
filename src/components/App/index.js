import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ResizeObserver from 'resize-observer-polyfill';

import StateMachine from '../StateMachine';

class App extends Component {

  componentDidMount() {
    const ro = new ResizeObserver((entries, observer) => {
      console.log(entries, observer);
      for (const entry of entries) {
          const {left, top, width, height} = entry.contentRect;

          console.log('Element:', entry.target);
          console.log(`Element's size: ${ width }px x ${ height }px`);
          console.log(`Element's paddings: ${ top }px ; ${ left }px`);
      }
    });

    ro.observe(this.wrapper);
  }

  render() {
    return (
      <div className="App" ref={c => this.wrapper = c}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <StateMachine />
      </div>
    );
  }
}

export default App;
