import React, {useState, useEffect} from 'react'
import axios from 'axios'
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
import { Checkbox, MenuItem } from '@material-ui/core/';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
export default props =>{
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

    const [item, setItem] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:8000/api/users/" + props.id)
            .then(res => setItem(res.data.user))
    }, [])

    const deleteItem =() =>{
        axios.delete("http://localhost:8000/api/users/delete/" + props.id)
        .then(navigate("/"))
    }


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

    const goToHome =() =>{
      navigate('/');
        console.log(item.taxForm);
    }
    const updateItem =()=>{
      navigate('/update/' + props.id)
    }
    

    const helpMe =()=>{
      console.log(item);
    }
  

    return(
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
                <MenuItem onClick={goToHome}>Home</MenuItem>
                <MenuItem onClick={goToAddItem}>Add Item</MenuItem>
                <MenuItem onClick={() => (logout())}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
          <Typography variant="h6" className={classes.title}>
            Building Blocks - Details about: {item.item}
          </Typography>
          <Typography>{user.name}  &nbsp; &nbsp;</Typography>
          <Avatar alt={user.name} src={user.picture} />
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      <Button variant="contained" color="primary" onClick={updateItem}>
  Update Item
</Button>
<Button variant="contained" color="secondary" onClick={deleteItem}>
  Remove from inventory
</Button> <br />
<Typography>Date In: {moment(item.dateIn).isValid() ? moment(item.dateIn).format('LL'): null}</Typography>
<Typography>Date Out: {item.dateOut}</Typography>
<Typography>Who Donated: {item.whoDonated}</Typography>
<Typography>Email: {item.donorEmail}</Typography>
<Typography>Phone Number: {item.donorPhoneNumber}</Typography>
<Typography>Address: {item.donorAddress}</Typography>
<Typography variant="h4" gutterBottom className={classes.Typography1}>
  Equipment Info
</Typography>
<Typography>Item: {item.item}</Typography>
<Typography>Brand: {item.brand}</Typography>
<Typography>Description: {item.description}</Typography>
<Typography>Serial Number: {item.serialNumber}</Typography>
<Typography>Value: {item.value}</Typography>
<Typography variant="h4" gutterBottom className={classes.Typography1}>
  Donated to:
</Typography>
<Typography>Name: {item.donateToName}</Typography>
<Typography>Email: {item.donateToEmail}</Typography>
<Typography>Phone Number: {item.donateToPhoneNumber}</Typography>
<Typography>Address: {item.donateToAddress}</Typography>
<Switch
        checked={typeof item.taxForm !== 'undefined' ? item.taxForm : false}
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
/>
<Typography>Tax form sent to donor?: {item.taxForm}</Typography>
<Typography>Thank You sent? {item.thankYou}</Typography>
<Typography>Entered in QuickBooks? {item.quickBooks}</Typography>
<Typography>Physical Location: {item.physicalLocation}</Typography>
<Typography>Notes: {item.notes}</Typography>
<Button variant="contained" color="primary" onClick={updateItem}>
  Update Item
</Button>
<button onClick={helpMe}>Help</button>


    </div>
  ));
}
