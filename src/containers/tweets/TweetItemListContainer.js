import React, { Component, Fragment } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import throttle from 'lodash-es/throttle';
import { getScrollTop, getScrollBottom } from 'lib/common';
import * as tweetActions from 'store/modules/tweets';
import TweetItemList from 'components/tweets/TweetItemList';
import Loading from 'components/common/Loading';
import shouldCancel from 'lib/shouldCancel';

function mapStateToProps({ tweets, user, pender }) {
  return {
    list: tweets.list,
    end: tweets.end,
    username: user.user && user.user.username,
    loading: pender.pending['tweets/GET_INITIAL'],
    lastId:
      tweets.list &&
      tweets.list.length > 0 &&
      tweets.list[tweets.list.length - 1] &&
      tweets.list[tweets.list.length - 1]._id,
    loadingNext: pender.pending['tweets/GET_NEXT'],
    firstId: tweets.list && tweets.list[0] && tweets.list[0]._id,
  };
}

class TweetItemListContainer extends Component {
  lastCursor = null;
  timeoutId = null;

  recentUpdater = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      const {
        TweetActions,
        match: { params },
      } = this.props;
      const { tag, username } = params;
      TweetActions.getRecent({
        cursor: this.props.firstId,
        recent: true,
        tag,
        username,
      });
      this.recentUpdater();
    }, 30 * 1000);
  };

  initialize = async () => {
    // if (window.ssr) {
    //   return;
    // }
    if (shouldCancel()) return;

    const {
      TweetActions,
      match: { params },
    } = this.props;

    const { tag, username } = params;
    try {
      await TweetActions.getInitial({
        username,
        tag,
      });
      this.recentUpdater();
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.initialize();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.match.params.username !== prevProps.match.params.username ||
      this.props.match.params.tag !== prevProps.match.params.tag
    ) {
      this.initialize();
    }
  }

  componentWillUnmount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = throttle(() => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom < 350) {
      this.getNext();
    }
  }, 250);

  getNext = () => {
    const { TweetActions, lastId, loadingNext, end, match } = this.props;
    if (loadingNext || end || this.lastCursor === lastId) return;
    const { tag, username } = match.params;
    TweetActions.getNext({ cursor: lastId, tag, username });
    this.lastCursor = lastId;
  };

  handleOpenRemoveModal = ({ id, needPass }) => {
    const { TweetActions } = this.props;
    TweetActions.openRemoveModal({ id, needPass });
  };

  render() {
    const { list, username, loading, loadingNext } = this.props;
    if (loading) return <Loading />;
    return (
      <Fragment>
        <TweetItemList
          tweets={list}
          currentUser={username}
          onRemove={this.handleOpenRemoveModal}
        />
        {loadingNext && <Loading />}
      </Fragment>
    );
  }
}

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    dispatch => ({
      TweetActions: bindActionCreators(tweetActions, dispatch),
    })
  )
);

export default enhance(TweetItemListContainer);
