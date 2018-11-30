import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import AppTemplate from 'components/base/AppTemplate';
import HeaderContainer from 'containers/base/HeaderContainer';
import Core from 'containers/base/Core';
// import { AuthPage, TweetsPage } from 'pages';

const Loading = () => {
  return <div>Loading....</div>;
};

const MainPage = Loadable({
  loader: () => import('./pages/TweetsPage'),
  loading: Loading,
  delay: 300,
});

const UserPage = Loadable({
  loader: () => import('./pages/TweetsPage'),
  loading: Loading,
  delay: 300,
});

const TagPage = Loadable({
  loader: () => import('./pages/TweetsPage'),
  loading: Loading,
  delay: 300,
});

const AuthPage = Loadable({
  loader: () => import('./pages/AuthPage'),
  loading: Loading,
  delay: 300,
});

const App = () => {
  return (
    <AppTemplate header={<HeaderContainer />}>
      <Route exact path="/" component={MainPage} />
      <Route path="/users/:username" component={UserPage} />
      <Route path="/tags/:tag" component={TagPage} />
      <Route path="/:authType(login|register)" component={AuthPage} />
      <Core />
    </AppTemplate>
  );
};

export default App;
