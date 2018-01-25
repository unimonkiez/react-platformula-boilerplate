# react-platformula-boilerplate

## The ultimate starter-kit to write native and web apps using react!

# Features
* ### Uses [`react-platformula`](https://github.com/uvop/react-platformula), which makes writing cross-platform easy
```jsx
import React, { Component } from 'react';
import Text from 'react-platformula/text';

export default class HelloWorld extends Component {
  render() {
    return (
      <Text>
        Hello World
      </Text>
    );
  }
}
```
* ### Easy usage of `svg`, `fonts` and `sounds`, no more manual linking!!
```jsx
import React, { Component } from 'react';
import Block from 'react-platformula/block';
import { getCustom as getCustomText } from 'react-platformula/text';
import punkFontFamily from './punk-font.ttf';
import { instance as lightTap } from './light-tap.mp3';
import getCustomSmiley from './smiley.svg';

const CustomText = getCustomText({
  fontFamily: punkFontFamily,
  fontSize: 30,
  color: 'red',
});

const CustomSmiley = getCustomSmiley({
  width: 20,
  height: 20,
  fill: 'blue',
});

export default class Button extends Component {
  handlePress(e) {
    const { onPress } = this.props;
    lightTap.play();
  }

  render() {
    const { text } = this.props;
    return (
      <Block>
        <CustomSmiley />
        <CustomText>
          Click me for sound
        </CustomText>
      </Block>
    );
  }
}
```
* ### Uses `webpack` with single and easy configure file, you can add support for typescript, flow or whatever you like!

## Installation
* Make sure you installed `react-native`'s dependencies (such as java, xcode) check their [tutorial](https://facebook.github.io/react-native/docs/getting-started.html) if needed.
* run `npm i` (or `yarn`).
* You are now ready to use the boilerplate!  
  to make it your own do the fellowing steps
  * Change [`app.json`](https://github.com/unimonkiez/react-platformula-boilerplate/blob/master/app.json) name and display name.
  * Change registered component name too in [`src/index.js`](https://github.com/unimonkiez/react-platformula-boilerplate/blob/master/src/index.js).
  * If you need to keep the ejected projects ([some libraries linking is manual](https://github.com/facebook/react-native/issues/13783)), just remove them from `.gitignore` file.

## Usage
* `npm start, npm run start:web` - Start website on [localhost:8090](http://localhost:8090).
* `npm run start:android` - Install and start on android.
* `npm run start:ios` - Install and start on ios.
* `npm run lint[:report][:error][:fix]` - Run lints usings eslint, recommand to install eslint-plugin on your editor.
* `npm run test[:watch]` - Run unit tests, uses [`jest`](https://facebook.github.io/jest/).
* `npm run create:android:release` - Creates release APK.
