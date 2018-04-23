const path = require("path");

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`src/templates/blog-template.js`);

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
          }
        }
      }
    }
  `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: '/blog/' + node.fileAbsolutePath.split('/').pop().split('.').shift(),
          component: blogPostTemplate,
          context: {
            fileAbsolutePath: node.fileAbsolutePath
          }, // additional data can be passed via context
        });
      });
    });
};