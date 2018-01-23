import React, { Component } from 'react';
import HelloWorld from 'src/component/hello-world';
import Button from 'src/component/button';
import Provider from './provider';

export default class App extends Component {
  render() {
    return (
      <Provider>
        <HelloWorld />
        <Button text="Press here for sound" />
      </Provider>
    );
  }
}
