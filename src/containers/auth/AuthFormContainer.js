import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as authActions from 'store/modules/auth';
import * as userActions from 'store/modules/user';
import { saveUser } from 'lib/common';
import AuthForm from 'components/auth/AuthForm';

class AuthFormContainer extends Component {
  handleChange = e => {
    const { name, value } = e.target;
    const { AuthActions } = this.props;
    AuthActions.changeInput({
      field: name,
      value,
    });
  };

  handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleRegister = async () => {
    const { fields, AuthActions, UserActions } = this.props;
    const { username, password, passwordConfirm } = fields;

    if (password !== passwordConfirm) {
      AuthActions.setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!/^[a-z-0-9-_]{3,15}$/.test(username)) {
      AuthActions.setError('계정명은 3~15자의 영소문자/숫자여야 합니다.');
      return;
    }

    if (password.length < 6) {
      AuthActions.setError('비밀번호가 너무 짧습니다.');
      return;
    }

    try {
      await AuthActions.register({
        username,
        password,
      });
      await UserActions.checkAuth();
      saveUser(this.props.user);
      this.props.history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  handleLogin = async () => {
    const { fields, AuthActions, UserActions } = this.props;
    const { username, password } = fields;

    try {
      if (!username) {
        AuthActions.setError('아이디를 입력하세요.');
        return;
      }

      if (!password) {
        AuthActions.setError('비밀번호를 입력하세요.');
        return;
      }
      await AuthActions.login({ username, password });
      await UserActions.checkAuth();
      saveUser(this.props.user);
      this.props.history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    const { AuthActions } = this.props;
    AuthActions.initialize();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.type !== this.props.type) {
      const { AuthActions } = this.props;
      AuthActions.initialize();
    }
  }

  render() {
    const { type, fields, error } = this.props;
    return (
      <AuthForm
        register={type === 'register'}
        onGoBack={this.handleGoBack}
        onChange={this.handleChange}
        onSubmit={type === 'register' ? this.handleRegister : this.handleLogin}
        fields={fields}
        error={error}
      />
    );
  }
}

const enhance = compose(
  withRouter,
  connect(
    ({ auth, user }) => ({
      fields: auth.fields,
      error: auth.error,
      user: user.user,
    }),
    dispatch => ({
      AuthActions: bindActionCreators(authActions, dispatch),
      UserActions: bindActionCreators(userActions, dispatch),
    })
  )
);

export default enhance(AuthFormContainer);
