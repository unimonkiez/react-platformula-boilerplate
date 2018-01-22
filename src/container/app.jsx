import React, { Component } from 'react';
import HelloWorld from 'src/component/hello-world';
import Provider from './provider';

export default class App extends Component {
  render() {
    return (
      <Provider>
        <HelloWorld />
      </Provider>
    );
  }
}
