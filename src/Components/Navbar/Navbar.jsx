import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link,useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    '&:hover':{
      cursor: 'pointer',
    }
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const history=useHistory();

  const goLanding=()=>{
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography onClick={()=>goLanding()} variant="h6" className={classes.title}>
            Book Finder
          </Typography>
          <Button style={{marginLeft:'auto'}} component={Link} to={'/add'} color="inherit">Add New Book</Button>
          <Button style={{marginLeft:'auto'}} component={Link} to={'/auth'} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
