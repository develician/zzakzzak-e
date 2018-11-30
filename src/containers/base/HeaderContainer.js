import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/base/Header';
import Button from 'components/common/Button';
import { logout } from 'store/modules/user';
import { clearUser } from 'lib/common';
import UserStatus from 'components/base/UserStatus';

class HeaderContainer extends Component {
  handleLogout = () => {
    clearUser();
    this.props.logout();
  };

  render() {
    if (!this.props.visible) return null;
    const { user } = this.props;
    return (
      <Header
        right={
          user ? (
            <UserStatus username={user.uesrname} onLogout={this.handleLogout} />
          ) : (
            <Button to="/login" outline>
              로그인
            </Button>
          )
        }
      />
    );
  }
}

export default connect(
  ({ base, user }) => ({
    visible: base.header,
    user: user.user,
  }),
  {
    logout,
  }
)(HeaderContainer);
