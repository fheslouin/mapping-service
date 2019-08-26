import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"
import TagCard from "../components/TagCard"

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    margin: 10,
    width: 70,
    height: 70,
  },
  ListItemParentDiv: {
    display: "flex",
  },
  flexBoxParentDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    "&::after": {
      content: "",
      flex: "auto",
    },
  },
})

class TagsPage extends React.Component {
  render() {
    const classes = this.props.classes

    let items = this.props.data.allGoogleSpreadsheetExport.edges
    let uniqueTagsWithLength = []
    const tagMap = new Map()
    for (const item of items) {
      for (const tag of item.node.tags.split(",")) {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, true)
          uniqueTagsWithLength.push({
            tagName: tag,
            numberOfVideos: items.filter(
              innerItem => innerItem.node.tags.includes(tag) // test if tag is in node.tags array
            ).length,
          })
        }
      }
    }

    return (
      <Layout>
        <SEO title="Explore serices by Tag" />
        <div className={classes.root}>
          <div className={classes.flexBoxParentDiv}>
            {uniqueTagsWithLength.map(tag => (
              <TagCard tag={tag} />
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export default withStyles(styles)(TagsPage)

export const query = graphql`
  query TagsQuery {
    allGoogleSpreadsheetExport {
      edges {
        node {
          id
          optimized_thumbnail {
            childImageSharp {
              fluid(maxWidth: 400, maxHeight: 250) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          title
          tags
          location
          locationImage
          servicesProvided
        }
      }
    }
  }
`
