import React, { Component } from 'react';
import Block from 'react-platformula/block';
import { getCustom as getCustomText } from 'react-platformula/text';
import fontFamily1 from 'src/font/pricedown.ttf';

const Text1 = getCustomText({
  fontFamily: fontFamily1,
});

export default class FontExamples extends Component {
  render() {
    return (
      <Block>
        <Text1>
          Example font 1
        </Text1>
      </Block>
    );
  }
}
