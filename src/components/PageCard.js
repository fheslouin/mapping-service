import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from '@material-ui/core/CardHeader';
import Chip from "@material-ui/core/Chip"
import Typography from "@material-ui/core/Typography"
import Link from "gatsby-link"
import Label from "@material-ui/icons/Label"
import Avatar from "@material-ui/core/Avatar"
import { red } from '@material-ui/core/colors';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Img from 'gatsby-image'

import { kebabCase } from "lodash"

const styles = theme => ({
  card: {
    width: 310,
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      width: "98vw",
    },
  },
  cardContent: {
    height: 230,
    [theme.breakpoints.down('sm')]: {
      height:180
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  title: {
    lineHeight: 1.2,
    fontSize: "1.2rem",
  },
  tagChips: {
    margin: "3px 3px 3px 0px",
    height: 26,
  },
  tagArea: {
    marginTop: 10,
  },
  avatar: {
    backgroundColor: red[500],
  },
  chipLabel: {
    color: "#c5c5c5",
  },
  locationChips: {
    marginTop: 5,
    background: "none",
  },
})

function PageCard(props) {
  const { classes, item } = props

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Link
          key={item.node.id}
          style={{ textDecoration: "none" }}
          to={`/video/${kebabCase(item.node.title)}/`}
        >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {item.node.title.charAt(0)}
          </Avatar>
        }
        title={item.node.title}
        subheader={item.node.openingTimes}
      />
      <Img
          alt={item.node.title}
          fluid={item.node.optimized_thumbnail.childImageSharp.fluid}
      />
      </Link>
      </CardActionArea>
      <CardContent>
        <Typography variant="subtitle1" color="textSecondary" component="p" noWrap="true">
          {item.node.servicesProvided}
        </Typography>
        <Link
            to={`/location/${kebabCase(item.node.instructor)}/`}
            style={{ textDecoration: "none" }}
          >
            <Chip
              avatar={
                <LocationOnIcon/>
              }
              label={item.node.location}
              variant="outlined"
              clickable
              className={classes.locationChips}
            />
          </Link>
          <div className={classes.tagArea}>
            {item.node.tags.split(",").map(tag => (
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
        </CardContent>
    </Card>
  )
}

export default withStyles(styles)(PageCard)
