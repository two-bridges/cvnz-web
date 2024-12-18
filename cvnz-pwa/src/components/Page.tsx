
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';

const { NODE_ENV, REACT_APP_GA_MEASUREMENT_ID: GA_MEASUREMENT_ID } = process.env;

function Page({ title, children, ...rest }: any) {
  const location = useLocation();

  useEffect(() => {
    if (NODE_ENV !== 'production') {
      return;
    }

    if ((window as any).gtag) {
      (window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname,
        page_name: title
      });
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div {...rest}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
}

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string
};

export default Page;
