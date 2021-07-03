require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Geo Nomad',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Geo Nomad',
        short_name: 'GeoNomad',
        start_url: '/',
        icon: 'src/images/nomad-icon.png',
      },
    },
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
  ],
};
