import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import AppTemplate from 'components/base/AppTemplate';
import HeaderContainer from 'containers/base/HeaderContainer';
import Core from 'containers/base/Core';
import { Rendered } from 'lib/shouldCancel';
// import { AuthPage, TweetsPage } from 'pages';

// const Loading = () => {
//   return <div>Loading....</div>;
// };

const MainPage = Loadable({
  loader: () => import('./pages/TweetsPage'),
  loading: () => null,
  // delay: 300,
});

const UserPage = Loadable({
  loader: () => import('./pages/TweetsPage'),
  loading: () => null,
  // delay: 300,
});

const TagPage = Loadable({
  loader: () => import('./pages/TweetsPage'),
  loading: () => null,
  // delay: 300,
});

const AuthPage = Loadable({
  loader: () => import('./pages/AuthPage'),
  loading: () => null,
  // delay: 300,
});

const NotFoundPage = Loadable({
  loader: () => import('./pages/NotFoundPage'),
  loading: () => null,
  // delay: 300,
});

const App = () => {
  return (
    <AppTemplate header={<HeaderContainer />}>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/users/:username" component={UserPage} />
        <Route exact path="/tags/:tag" component={TagPage} />
        <Route path="/:authType(login|register)" component={AuthPage} />
        <Route component={NotFoundPage} />
        <Core />
      </Switch>
      <Rendered />
    </AppTemplate>
  );
};

export default App;
