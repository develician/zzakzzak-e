import React from 'react';
import TweetsTemplate from 'components/tweets/TweetsTemplate';
import TweetWriteContainer from 'containers/tweets/TweetWriteContainer';
import TweetItmeListContainer from 'containers/tweets/TweetItemListContainer';

const TweetsPage = ({ match }) => {
  return (
    <TweetsTemplate>
      {match.path === '/' && <TweetWriteContainer />}
      <TweetItmeListContainer />
    </TweetsTemplate>
  );
};

export default TweetsPage;
