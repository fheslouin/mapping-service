import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Typography from "@material-ui/core/Typography"
import PageCard from "../components/PageCard"
import Chip from "@material-ui/core/Chip"
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    marginBottom: ".2em",
  },
  backButton: {
    textDecoration: "none",
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
  locationChips: {
    marginLeft: 10,
    background: "none",
  },
})

const locationPage = ({ data, classes, pageContext }) => {
  const itemsWithlocation = data.allGoogleSpreadsheetExport.edges

  return (
    <Layout>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom align="center" component="h1">
          {itemsWithlocation.length} services in
          <Chip
            avatar={
              <LocationOnIcon/>
            }
            label={pageContext.location}
            variant="outlined"
            className={classes.locationChips}
          />
        </Typography>

        <div className={classes.flexBoxParentDiv}>
          {itemsWithlocation.map((item, index) => (
            <PageCard item={item} key={index} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default withStyles(styles)(locationPage)

export const locationPageQuery = graphql`
  query locationPage($location: String) {
    site {
      siteMetadata {
        title
      }
    }
    allGoogleSpreadsheetExport(filter: { location: { in: [$location] } }) {
      totalCount
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
          servicesProvided
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
