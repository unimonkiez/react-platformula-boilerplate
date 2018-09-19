import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCustom as getCustomBlock } from 'react-platformula/block';
import Text from 'react-platformula/text';
import sound from './light-tap.mp3';

const Block = getCustomBlock({
  borderColor: 'red',
  borderWidth: 1,
  alignItems: 'center',
});

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    text: '',
    onPress: undefined,
  };

  handlePress = this.handlePress.bind(this);

  handlePress(e) {
    const { onPress } = this.props;
    sound.play();

    if (onPress) {
      onPress(e);
    }
  }

  render() {
    const { text } = this.props;
    return (
      <Block onPress={this.handlePress}>
        <Text>
          {text}
        </Text>
      </Block>
    );
  }
}
