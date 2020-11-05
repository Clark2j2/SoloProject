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
import { MenuItem } from '@material-ui/core/';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch';
// import TextField from '@material-ui/core/TextField'
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
    buttons:{
      marginLeft: "20px",
      float: "right",
      margin: "20px",
    },
    detailTypeographyAbove:{
      paddingTop: "20px",
      paddingLeft: "500px",
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

    // const handleChange = (event) => {
    //     setAuth(event.target.checked);
    //   };
    
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
      <Button className={classes.buttons} variant="contained" color="primary" onClick={updateItem}>
        Update Item
      </Button>
      <Button className={classes.buttons} variant="contained" color="secondary" onClick={deleteItem}>
        Remove from inventory
      </Button> <br />
<Typography className="detailTypeographyAbove">Date In: {moment(item.dateIn).isValid() ? moment(item.dateIn).format('LL'): null}</Typography>
<Typography className="detailTypeography">Date Out: {moment(item.dateOut).isValid() ? moment(item.dateOut).format('LL'): null}</Typography>
<Typography className="detailTypeography">Who Donated: {item.whoDonated}</Typography>
<Typography className="detailTypeography">Email: {item.donorEmail}</Typography>
<Typography className="detailTypeography">Phone Number: {item.donorPhoneNumber}</Typography>
<Typography className="detailTypeography">Address: {item.donorAddress}</Typography>
<Typography variant="h4" gutterBottom className={classes.Typography1}>
  Equipment Info
</Typography>
<Typography className="detailTypeography">Item: {item.item}</Typography>
<Typography className="detailTypeography">Brand: {item.brand}</Typography>
<Typography className="detailTypeography">Description: {item.description}</Typography>
<Typography className="detailTypeography">Serial Number: {item.serialNumber}</Typography>
<Typography className="detailTypeography">Value: {item.value}</Typography>
<Typography variant="h4" gutterBottom className={classes.Typography1}>
  Donated to:
</Typography>
<Typography className="detailTypeography">Name: {item.donateToName}</Typography>
<Typography className="detailTypeography">Email: {item.donateToEmail}</Typography>
<Typography className="detailTypeography">Phone Number: {item.donateToPhoneNumber}</Typography>
<Typography className="detailTypeography">Address: {item.donateToAddress}</Typography>

<Typography className="detailTypeography">Tax form sent to donor?: {item.taxForm}</Typography>
<Switch
        checked={typeof item.taxForm !== 'undefined' ? item.taxForm : false}
        color="primary"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
/>
<Typography className="detailTypeography">Thank You sent? {item.thankYou}</Typography>
<Switch
        checked={typeof item.thankYou !== 'undefined' ? item.thankYou : false}
        color="primary"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
/>
<Typography className="detailTypeography">Entered in QuickBooks? {item.quickBooks}</Typography>
<Switch
        checked={typeof item.quickBooks !== 'undefined' ? item.quickBooks : false}
        color="primary"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
/>
<Typography className="detailTypeography">Physical Location: {item.physicalLocation}</Typography>
<Typography className="detailTypeography">Notes: {item.notes}</Typography>
<Button className={classes.buttons} variant="contained" color="primary" onClick={updateItem}>
  Update Item
</Button>
    </div>
  ));
}
