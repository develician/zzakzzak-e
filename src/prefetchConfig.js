import { hideHeader } from 'store/modules/base';
import { getInitial } from 'store/modules/tweets';

const prefetchConfig = [
  {
    exact: true,
    path: '/',
    prefetch: store => {
      return store.dispatch(getInitial());
    },
  },
  {
    exact: true,
    path: '/users/:username',
    prefetch: (store, params) => {
      return store.dispatch(getInitial({ username: params.username }));
    },
  },
  {
    exact: true,
    path: '/tags/:tag',
    prefetch: (store, params) => {
      return store.dispatch(
        getInitial({
          tag: decodeURI(params.tag),
        })
      );
    },
  },
  {
    path: '/:authType(login|register)',
    prefetch: (store, params) => {
      store.dispatch(hideHeader());
      return Promise.resolve();
    },
  },
];

export default prefetchConfig;
