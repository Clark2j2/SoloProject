import React from 'react'
import {navigate} from '@reach/router'
import {useAuth0} from '@auth0/auth0-react'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core/';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ItemList from './ItemList'


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
    const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
    
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const goToAddItem = () =>{
    navigate('/add/')
  }

  return (
    isAuthenticated && (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          {auth && (
            <div><IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <AccountCircle />
              </MenuIcon></IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={goToAddItem}>Add Item</MenuItem>
                <MenuItem onClick={() => (logout())}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
          <Typography variant="h6" className={classes.title}>
            Building Blocks - Available Inventory
          </Typography>
          <Typography>{user.name}  &nbsp; &nbsp;</Typography>
          <Avatar alt={user.name} src={user.picture} />
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      <ItemList />
    </div>
  ));
}
//     return (
        // isAuthenticated && (
//         <div>
//             <ThemeProvider theme={theme}>
//             <AppBar position="static">
//                 <Toolbar>
//                 <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             <MenuIcon>
//               <MenuItem onClick={handleClose}>Add a new item</MenuItem>
//               <MenuItem>Add a new item</MenuItem>
//             </MenuIcon>
//         </IconButton>
//         <Typography variant="h6" className={classes.title}>
//           Building Blocks - Available Inventory
//     </Typography>
    // <Typography>{user.name}  &nbsp; &nbsp;</Typography>
    // <Avatar alt={user.name} src={user.picture} />
    // <Button color="inherit" onClick={() => (logout())}>Log Out</Button>
//   </Toolbar>
// </AppBar>
// </ThemeProvider>
//         </div>)
//     )
// }

export default HomePage

