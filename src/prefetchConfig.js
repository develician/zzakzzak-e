import * as tweetsActions from 'store/modules/tweets';
import { bindActionCreators } from 'redux';

const prefetchConfig = [
  {
    path: '/',
    prefetch: (store, params) => {
      const TweetsActions = bindActionCreators(tweetsActions, store.dispatch);
      return TweetsActions.getInitial({
        username: params.username,
        tag: params.tag,
      });
    },
  },
];

export default prefetchConfig;
