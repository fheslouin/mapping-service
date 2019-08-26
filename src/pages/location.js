import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"
import LocationCard from "../components/LocationCard"

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

class locationPage extends React.Component {
  render() {
    const classes = this.props.classes

    let items = this.props.data.allGoogleSpreadsheetExport.edges

    let uniquelocationsWithLengthAndImage = []
    const map = new Map()
    for (const item of items) {
      if (!map.has(item.node.location)) {
        map.set(item.node.location, true)
        uniquelocationsWithLengthAndImage.push({
          location: item.node.location,
          optimized_location_image: item.node.optimized_location_image,
          numberOfVideos: items.filter(
            innerItem => innerItem.node.location === item.node.location // check if location matches
          ).length,
        })
      }
    }
    return (
      <Layout>
        <SEO title="Service mapping | Explore services by location" />
        <div className={classes.root}>
          <div className={classes.flexBoxParentDiv}>
            <div className={classes.flexBoxParentDiv}>
              {uniquelocationsWithLengthAndImage.map((item, index) => (
                <LocationCard item={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withStyles(styles)(locationPage)

export const query = graphql`
  query locationsQuery {
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
          optimized_location_image {
            childImageSharp {
              fluid(maxHeight: 50) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
