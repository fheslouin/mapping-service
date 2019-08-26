import { Link } from "gatsby"
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import MapIcon from '@material-ui/icons/Map';

const styles = {
  root: {
    flexGrow: "1 !important",
  },
  appbar: {
    backgroundColor: "",
  },
  grow: {
    flexGrow: 1,
    color: "white",
    textDecoration: `none`,
  },
  link: {
    color: `white`,
    textDecoration: `none`,
  },
  pageTitle: {
    color: "white",
  },
}

class Header extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar><MapIcon/>
            <div className={classes.grow}>
              <Link to="/" className={classes.link}>
                <Typography
                  className={classes.pageTitle}
                  variant="title"
                  component="h1"
                >
                  Mapping services
                </Typography>
              </Link>
            </div>
            <div>
              <Link to="/tags" className={classes.link}>
                <Button color="inherit" className={classes.grow}>
                  Tags
                </Button>
              </Link>
              <Link to="/location" className={classes.link}>
                <Button color="inherit" className={classes.grow}>
                  locations
                </Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Header)
