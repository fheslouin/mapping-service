import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Typography from "@material-ui/core/Typography"
import PageCard from "../components/PageCard"
import Chip from "@material-ui/core/Chip"
import Label from '@material-ui/icons/Label';

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
  chipLabel:{
    color: "#c5c5c5",

  },
  tagChips:{
    fontSize:20,
    marginLeft:5,


}
})

const TagPage = ({ data, classes, pageContext }) => {
  const itemsWithTag = data.allGoogleSpreadsheetExport.edges

  return (
    <Layout>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom align="center" component="h1">
          {itemsWithTag.length} {itemsWithTag.length > 1 ? 'services' : 'service'} tagged with
          <Chip icon={<Label className={classes.chipLabel} />} label={pageContext.tag} key={pageContext.tag.toString()} className={classes.tagChips}/>
        </Typography>

        <div className={classes.flexBoxParentDiv}>
          {itemsWithTag.map(item => (
            <PageCard item={item} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default withStyles(styles)(TagPage)

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allGoogleSpreadsheetExport(filter: { tags: { in: [$tag] } }) {
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
