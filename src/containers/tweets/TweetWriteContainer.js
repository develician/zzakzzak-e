import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeInput, writeTweet } from 'store/modules/write';
import { getRecent } from 'store/modules/tweets';
import TweetWrite from 'components/tweets/TweetWrite';

function mapStateToProps({ write, user, tweets }) {
  return {
    fields: write.fields,
    firstId: tweets.list && tweets.list.length > 0 && tweets.list[0]._id,
    user: user.user,
  };
}

class TweetWriteContainer extends Component {
  handleChange = e => {
    const { changeInput } = this.props;
    const { name, value } = e.target;
    changeInput({
      field: name,
      value,
    });
  };

  handleWrite = async () => {
    const { fields, changeInput, writeTweet, getRecent } = this.props;
    const { name, password, text } = fields;
    if (!text) return;
    try {
      changeInput({
        field: 'text',
        value: '',
      });

      await writeTweet({
        name: name || '이름없음',
        pass: password,
        text,
      });

      await getRecent({
        cursor: this.props.firstId,
        recent: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { fields, user } = this.props;
    return (
      <TweetWrite
        onChange={this.handleChange}
        fields={fields}
        onWrite={this.handleWrite}
        logged={!!user}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  {
    writeTweet,
    changeInput,
    getRecent,
  }
)(TweetWriteContainer);
