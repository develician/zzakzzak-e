import React from 'react';
import './TweetsTemplate.scss';
// import classNames from 'classnames/bind';

//const cx = classNames.bind(styles);

const TweetsTemplate = ({ children }) => {
  return <div className="TweetsTemplate">{children}</div>;
};

export default TweetsTemplate;
