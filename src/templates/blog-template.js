import React from "react";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;
  return (
    <div style={{
      maxWidth: '850px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont', fontSize: '28px'
    }}>
      <div>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div >
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;