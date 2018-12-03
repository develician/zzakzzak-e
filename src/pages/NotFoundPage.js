import React, { Fragment } from 'react';
import NotFound from 'components/base/NotFound/NotFound';
import HideHeader from 'containers/base/HideHeader';

const NotFoundPage = ({ staticContext }) => {
  return (
    <Fragment>
      <NotFound />
      <HideHeader />
    </Fragment>
  );
};

export default NotFoundPage;
