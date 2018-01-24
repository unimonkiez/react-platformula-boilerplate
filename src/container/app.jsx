import React, { Component } from 'react';
import HelloWorld from 'src/component/hello-world';
import Button from 'src/component/button';
import FontExamples from 'src/component/font-examples';
import { getCustom as getCustomBlock } from 'react-platformula/block';
import Provider from './provider';

const Pad = getCustomBlock({
  paddingTop: 12,
});

export default class App extends Component {
  render() {
    return (
      <Provider>
        <Pad />
        <HelloWorld />
        <FontExamples />
        <Button text="Press here for sound" />
      </Provider>
    );
  }
}
