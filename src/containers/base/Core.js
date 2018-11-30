import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';
import { loadUser } from 'lib/common';

function mapStateToProps({ user }) {
  return {
    tokenExp: user.tokenExp,
  };
}

class Core extends Component {
  initialize = async () => {
    const user = loadUser();
    if (user) {
      const { UserActions } = this.props;
      UserActions.tempSetUser(user);
      try {
        await UserActions.checkAuth();
        const today = Math.round(new Date().getTime());
        if (this.props.tokenExp - today > 60 * 60 * 24 * 3) {
          await UserActions.refreshToken();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    return null;
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(Core);
