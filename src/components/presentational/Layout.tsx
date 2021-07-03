import React from 'react';
import Helmet from 'react-helmet';

const Layout: React.FC = ({ children }) => (
  <>
    <Helmet>
      <html lang="en" />
      <title>Geo Nomad</title>
      <meta name="description" content="site description" />
    </Helmet>
    <main>{children}</main>
  </>
);
export default Layout;
