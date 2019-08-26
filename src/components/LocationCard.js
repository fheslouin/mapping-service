import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Link from "gatsby-link"
import { kebabCase } from "lodash"
import Chip from "@material-ui/core/Chip"
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = theme => ({
  card: {
    width: 300,
    margin: 10,
    borderRadius: 15,
    [theme.breakpoints.down('sm')]: {
      width:"42vw"
    },
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
  },
  locationAvatar: {
    width: 40,
    height: 40,
    [theme.breakpoints.down('sm')]: {
      width:25,
      height:25
    },
  },
  locationChips: {
    marginLeft: 0,
    fontSize:"1.3rem",
    height:40,
    background: "none",
    [theme.breakpoints.down('sm')]: {
      height:25,
      fontSize:"1rem"
    

    },
  },
})

function locationCard(props) {
  const { classes, item } = props

  //console.log(item);

  return (
    <Card className={classes.card}>
      <Link
        style={{ textDecoration: "none" }}
        to={`/location/${kebabCase(item.location)}/`}
      >
        <CardContent className={classes.cardContent}>
          <div>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {item.numberOfVideos}{" "}
              {item.numberOfVideos > 1 ? "services" : "service"}
            </Typography>
  

            <Chip
            avatar={
              <LocationOnIcon/>
            }
            label={item.location.substring(0, 18)}
            variant="outlined"
            clickable="true"
            className={classes.locationChips}
          />
          </div>


        </CardContent>
      </Link>
    </Card>
  )
}

export default withStyles(styles)(locationCard)
