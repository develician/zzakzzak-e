import { Component } from 'react';

// 서버사이드 렌더링 이후, 가장 첫 렌더링에서는 shouldCancel 이 true
// App 렌더링이 한번 마치고 나면, 그 다음부터는 false

let cancel = typeof window !== 'undefined' && !!window.__PRELOADED_STATE__;

const shouldCancel = () => {
  console.log('browser', typeof window !== 'undefined');
  console.log('preloaded state', !!window.__PRELOADED_STATE__);
  return cancel;
};

export class Rendered extends Component {
  componentDidMount() {
    cancel = false;
    console.log(cancel);
  }

  render() {
    return null;
  }
}

export default shouldCancel;
