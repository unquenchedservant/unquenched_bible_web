import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
  useLocation,
  Link
} from "react-router-dom";
import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import Home from "./pages/home";
import Settings from "./pages/settings";
import Statistics from "./pages/statistics";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
}));

function getMonth(numeralMonth) {
  let month = "";
  switch(numeralMonth){
    case "1":
      month = "January";
      break;
    case "2":
      month = "February";
      break;
    case "3":
      month = "March";
      break;
    case "4":
      month = "April";
      break;
    case "5":
      month = "May";
      break;
    case "6":
      month = "June";
      break;
    case "7":
      month = "July";
      break;
    case "8":
      month = "August";
      break;
    case "9":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
    default:
      month="ERROR";
  }
  return month;
}



const GetTitle = (pathname) => {
  let title = ""
  switch(pathname){
    case "/":
      let [month, date ] = new Date().toLocaleDateString("en-US").split("/");
      title = getMonth(month) + " " + date;
      break;
    case "/statistics":
      title = "Statistics";
      break;
    case "/settings":
      title = "Settings";
      break;
    default:
      title="ERROR";
      break;
  }
  return title;
};

const GetIcon = (pathname) => {
  let icon="";
  switch(pathname){
    case "Home":
      icon = <HomeIcon />
      break;
    case "Settings":
      icon = <SettingsIcon />
      break;
    case "Statistics":
      icon = <EqualizerIcon />
      break;
    default:
      icon= <HomeIcon />
      break;
  }
  return icon;
}
function ClippedDrawer() {
  const classes = useStyles();
  const location = useLocation();

  const drawer = (
    <div className={classes.drawerContainer}>
          <List>
            {["Home", "Statistics", "Settings"].map((text, index) => (
              <ListItem key={text} component={Link} to={ text==="Home" ? "/" : "/" + text.toLowerCase()}>
                <ListItemIcon>
                  { GetIcon(text) }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            </List>
          </div>
    );

  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          { GetTitle(location.pathname) }
        </Typography>
      </Toolbar>
    </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            {drawer}
          </Drawer>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={() => <Home />} />
              <Route path="/home" component={ () => <Home />} />
              <Route path="/statistics" component={ () => <Statistics />} />
              <Route path="/settings" component={ () => <Settings />} />
            </Switch>
          </main>
      </div>
      
  );
}


export default function App() {
  return(
    <BrowserRouter>
      <ClippedDrawer />
    </BrowserRouter>
  );
}

