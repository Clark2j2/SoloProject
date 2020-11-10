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
  }));

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3e2e67',
        dark: '#002884',
        contrastText: 'white',
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
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
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
      </Button> <br /><div className="results">
<Typography style={{marginRight: 20}}variant="subtitle1" align="justify" display="inline"><b>Date In: </b> {moment(item.dateIn).isValid() ? moment(item.dateIn).format('LL'): null}</Typography>
<Typography variant="subtitle1" align="justify" className="detailTypeography" display="inline" ><b>Date Out: </b> {moment(item.dateOut).isValid() ? moment(item.dateOut).format('LL'): null}</Typography>
<Typography style={{marginTop: 10, marginBottom: 5}}><b>Who Donated: </b>{item.whoDonated}</Typography>
<Typography style={{marginBottom: 5}} className="detailTypeography"><b>Email:</b> {item.donorEmail}</Typography>
<Typography className="detailTypeography"><b>Phone Number:</b> {item.donorPhonenumber}</Typography>
<Typography className="detailTypeography"><b>Address:</b> {item.donorAddress}</Typography>
<hr />
<Typography variant="h4" gutterBottom className={classes.Typography1}>
  Equipment Info
</Typography>
<Typography className="detailTypeography"><b>Item:</b> {item.item}</Typography>
<Typography className="detailTypeography"><b>Brand:</b> {item.brand}</Typography>
<Typography className="detailTypeography"><b>Description:</b> {item.description}</Typography>
<Typography className="detailTypeography"><b>Serial Number:</b> {item.serialNumber}</Typography>
<Typography className="detailTypeography"><b>Value: </b>{item.value}</Typography>
<hr />
<Typography variant="h4" gutterBottom className={classes.Typography1}>
  Donated to:
</Typography>
<Typography className="detailTypeography"><b>Name: </b>{item.donateToName}</Typography>
<Typography className="detailTypeography"><b>Email: </b>{item.donateToEmail}</Typography>
<Typography className="detailTypeography"><b>Phone Number: </b>{item.donateToPhonenumber}</Typography>
<Typography className="detailTypeography"><b>Address: </b>{item.donateToAddress}</Typography>
<hr />
<Typography display="inline" className="detailTypeography"><b>Tax form sent to donor?: </b>{item.taxForm}</Typography>
<Switch
        checked={typeof item.taxForm !== 'undefined' ? item.taxForm : false}
        color="primary"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
/>
<Typography display="inline" className="detailTypeography"><b>Thank You sent? </b>{item.thankYou}</Typography>
<Switch
        checked={typeof item.thankYou !== 'undefined' ? item.thankYou : false}
        color="primary"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
/>
<Typography display="inline" className="detailTypeography"><b>Entered in QuickBooks? </b>{item.quickBooks}</Typography>
<Switch
        checked={typeof item.quickBooks !== 'undefined' ? item.quickBooks : false}
        color="primary"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
/>
<Typography className="detailTypeography"><b>Physical Location: </b>{item.physicalLocation}</Typography>
<Typography display="inline" className="detailTypeography"><b>Notes: </b>{item.notes}</Typography>
<Button className={classes.buttons} variant="contained" color="primary" onClick={updateItem}>
  Update Item
</Button></div>
    </div>
  ));
}
