import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showHeader, hideHeader } from 'store/modules/base';

function mapStateToProps(state) {
  return {};
}

class HideHeader extends Component {
  constructor(props) {
    super(props);
    props.hideHeader();
  }

  componentWillUnmount() {
    this.props.showHeader();
  }

  render() {
    return null;
  }
}

export default connect(
  mapStateToProps,
  {
    showHeader,
    hideHeader,
  }
)(HideHeader);
