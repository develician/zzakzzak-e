import React from 'react';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import TweetItem from '../TweetItem';
import './TweetItemList.scss';

const TweetItemList = ({ tweets, currentUser, onRemove }) => {
  if (!tweets || tweets.length === 0) return null;
  const tweetItems = tweets.map(tweet => (
    <TweetItem
      key={tweet._id}
      tweet={tweet}
      currentUser={currentUser}
      onRemove={onRemove}
    />
  ));

  return <div className="TweetItemList">{tweetItems}</div>;
};

export default onlyUpdateForKeys(['tweets', 'currentUser'])(TweetItemList);
