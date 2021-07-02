require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Geo Nomad',
  },
  plugins: ['gatsby-plugin-netlify-cms', 'gatsby-plugin-emotion'],
};

// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === 'build-html' || stage === 'develop-html') {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /three-geojson-geometry/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     });
//   }
// };
