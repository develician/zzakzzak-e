import React from 'react';
import TweetsTemplate from 'components/tweets/TweetsTemplate';
import TweetWriteContainer from 'containers/tweets/TweetWriteContainer';
import TweetItmeListContainer from 'containers/tweets/TweetItemListContainer';
import TweetRemoveModalContainer from '../containers/tweets/TweetRemoveModalContainer';

const TweetsPage = ({ match }) => {
  return (
    <TweetsTemplate>
      {match.path === '/' && <TweetWriteContainer />}
      <TweetItmeListContainer />
      <TweetRemoveModalContainer />
    </TweetsTemplate>
  );
};

export default TweetsPage;
