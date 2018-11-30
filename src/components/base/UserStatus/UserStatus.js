import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';
import './UserStatus.scss';
// import classNames from 'classnames/bind';

//const cx = classNames.bind(styles);

const UserStatus = ({ username, onLogout }) => (
  <div className="UserStatus">
    <Link className="username" to={`/users/${username}`}>
      {username}
    </Link>
    <Button onClick={onLogout} outline>
      로그아웃
    </Button>
  </div>
);

export default UserStatus;
