import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Direction, { values } from 'react-platformula/direction';

export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: undefined,
  };

  render() {
    const { children } = this.props;
    return (
      <Direction value={values.ltr}>
        {children}
      </Direction>
    );
  }
}
