import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#ff9900',
        dark: '#002884',
        contrastText: 'fff#',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

const HomePage = () => {
    const {user,logout, isAuthenticated} = useAuth0();

    const helpMe = () =>{
        console.log(user);
    }
    helpMe();
    const classes = useStyles();
    return (
        isAuthenticated && (
        <div>
            <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Building Blocks - Available Inventory
    </Typography>
    <Typography>{user.name}  &nbsp; &nbsp;</Typography>
    <Avatar alt={user.name} src={user.picture} />
    <Button color="inherit" onClick={() => (logout())}>Log Out</Button>
  </Toolbar>
</AppBar>
</ThemeProvider>
        </div>)
    )
}

export default HomePage

