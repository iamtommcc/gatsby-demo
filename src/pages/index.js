import React from "react"
import Link from "gatsby-link"
export default ({ data }) => <div style={{
  maxWidth: '850px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont', fontSize: '28px'
}}>
  <p>Hello world!</p>
  <ul>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <li key={node.id}>
        <Link to={'/blog/' + node.fileAbsolutePath.split('/').pop().split('.').shift()}>{node.frontmatter.title} <span>— {node.frontmatter.date}</span></Link>
      </li>
    ))}
  </ul>
</div>

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          fileAbsolutePath
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
        }
      }
    }
  }
`;