import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Link } from "gatsby"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Chip from "@material-ui/core/Chip"
import Typography from "@material-ui/core/Typography"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Label from "@material-ui/icons/Label"
import Avatar from "@material-ui/core/Avatar"
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import PersonIcon from '@material-ui/icons/Person';

import Img from 'gatsby-image'

import { kebabCase } from "lodash"

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
  avatar: {
    backgroundColor: red[500],
  },
  backButton: {
    textDecoration: "none",
  },
  card: {
    width: "50vw",
    margin: "0 auto",
    [theme.breakpoints.down('sm')]: {
      width: "95vw",
    },
  },
  player:{
    [theme.breakpoints.down('sm')]: {
      width: "98vw !important",

    },
  },
  cardContent: {
    height: 600,
  },
  location: {
    color: "#616161",
  },
  tagChips: {
    margin: "3px 3px 3px 0px",
    height: 26,
  },
  tagArea: {
    marginTop: 10,
  },
  chipLabel: {
    color: "#c5c5c5",
  },
  locationChips: {
    marginTop: 5,
    background: "none",
  },
})

const ItemPage = ({ data, classes }) => {
  //console.log(data);
  const item = data.googleSpreadsheetExport

  return (
    <Layout>
   <Card className={classes.card}>
      <CardActionArea>
        <Link
          key={item.id}
          style={{ textDecoration: "none" }}
          to={`/video/${kebabCase(item.title)}/`}
        >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {item.title.charAt(0)}
          </Avatar>
        }
        title={item.title}
        subheader={item.openingTimes}
      />
      <Img
          alt={item.title}
          fluid={item.optimized_location_image.childImageSharp.fluid}
      />
      </Link>
      <Typography variant="caption"  color="error" component="p" >
      {item.conditions}
      </Typography>
      </CardActionArea>
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p" paragraph="true">
          {item.servicesProvided}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" paragraph="true">
          Comments : {item.comments}
        </Typography>
        <Link
            to={`/location/${kebabCase(item.instructor)}/`}
            style={{ textDecoration: "none" }}
          >
            <Chip
              avatar={
                <LocationOnIcon/>
              }
              label={item.location}
              variant="outlined"
              clickable
              className={classes.locationChips}
            />
          </Link>
          <div className={classes.tagArea}>
            {item.tags.split(",").map(tag => (
              <Link
                to={`/tag/${kebabCase(tag)}/`}
                style={{ textDecoration: "none" }}
              >
                <Chip
                  icon={<Label className={classes.chipLabel} />}
                  clickable
                  label={tag}
                  key={tag.toString()}
                  className={classes.tagChips}
                />
              </Link>
            ))}
          </div>
          <Typography variant="caption"  color="initial" component="p">
        <PersonIcon/>  {item.contactPerson}
        </Typography>
        </CardContent>
    </Card>
    </Layout>
  )
}

export default withStyles(styles)(ItemPage)

export const ItemPageQuery = graphql`
  query ItemDetails($itemId: String!) {
    googleSpreadsheetExport(id: { eq: $itemId }) {
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
      servicesProvided
      conditions
      locationImage
      location
      contactPerson
      openingTimes
      comments
      optimized_location_image {
        childImageSharp {
          fluid(maxHeight: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
