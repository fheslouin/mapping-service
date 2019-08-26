import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"
import PageCard from "../components/PageCard"


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

class IndexPage extends React.Component {
  render() {
    const classes = this.props.classes

    let items = this.props.data.allGoogleSpreadsheetExport.edges

    return (
      <Layout>
        <SEO title="Media-center" />
        <div className={classes.root}>
          <div className={classes.flexBoxParentDiv}>
            {items.map((item, index) => (
           
                <PageCard key={index} item={item} />
          
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export default withStyles(styles)(IndexPage)

export const query = graphql`
  query IndexQuery {
    allGoogleSpreadsheetExport(sort: {fields: [title], order: ASC}) {
      edges {
        node {
          id
          optimized_thumbnail {
            childImageSharp {
              fluid(maxHeight: 150) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          title
          tags
          location
          openingTimes
          servicesProvided
          optimized_location_image {
            childImageSharp {
              fluid(maxHeight: 70) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
