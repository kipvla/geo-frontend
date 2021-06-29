require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Geo Nomad',
  },
  plugins: ['gatsby-plugin-netlify-cms', 'gatsby-plugin-emotion'],
};
