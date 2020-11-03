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
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    container: {
      display: 'block',
      flexWrap: 'nowrap',
      width: '300',
      marginLeft: theme.spacing(10),
      marginRight: theme.spacing(10),
    },
    dateField: {
      marginLeft: '100px',
      marginRight: '80px',
      width: '142px',
      paddingRight: '50px'
       
    },
    nameField: {
        marginLeft: theme.spacing(34),
        marginRight: theme.spacing(10),
    },
    Typography1: {
        marginLeft: theme.spacing(30),
    },
    Typography2: {
        marginLeft: theme.spacing(33),
    },
    checkbox: {
        display: 'block',
    },
    submit: {
        display: 'inline-block',
        position: 'absolute',
        bottom: '0px',
        right: '50px',
        
    },
    input: {
        width: '300px'
    },
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

export default props => {
    const [object, setObject] = useState({});
    const [dateIn, setDateIn] = useState();
    const [dateOut, setDateOut] = useState();
    const [whoDonated, setWhoDonated] = useState({});
    const [donorEmail, setDonorEmail] = useState();
    const [donorPhoneNumber, setDonorPhoneNumber] = useState();
    const [donorAddress, setDonorAddress] = useState();
    const [item, setItem] = useState();
    const [brand, setBrand] = useState();
    const [description, setDescription] = useState();
    const [serialNumber, setSerialNumber] = useState();
    const [value, setValue] = useState();
    const [donateToName, setDonateToName] = useState();
    const [donateToEmail, setDonateToEmail] = useState();
    const [donateToPhoneNumber, setDonateToPhoneNumber] = useState();
    const [donateToAddress, setDonateToAddress] = useState();
    const [taxForm, setTaxForm] = React.useState(false);
    const [thankYou, setThankYou] = useState();
    const [quickBooks, setQuickBooks] = useState();
    const [physicalLocation, setPhysicalLocation] = useState();
    const [notes, setNotes] = useState();
    const [errs, setErrs] = useState();
    const {isAuthenticated} = useAuth0();
    const {user,logout} = useAuth0();
    const classes = useStyles();

    
    useEffect(() =>{
        axios.get("http://localhost:8000/api/users/" + props.id)
        .then(res=>{
            setObject(res.data.user);
            })
        .catch((err) =>{
            console.log(err)
            })
    }, [props.id]);

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        const donatedItem = {whoDonated};
        axios.put('http://localhost:8000/api/users/update/${props.id}', donatedItem)
        // axios.put('http://localhost:8000/api/users/update/' + props.id, {
        //     dateIn: dateIn,
        //     dateOut: dateOut,
        //     whoDonated: whoDonated,
        //     donorEmail: donorEmail,
        //     donorPhonenumber: donorPhoneNumber,
        //     donorAddress: donorAddress,
        //     item: item,
        //     brand: brand,
        //     description: description,
        //     serialNumber: serialNumber,
        //     value: value,
        //     donateToName: donateToName,
        //     donateToEmail: donateToEmail,
        //     donateToPhoneNumber: donateToPhoneNumber,
        //     donateToAddress: donateToAddress,
        //     taxForm: taxForm,
        //     thankYou: thankYou,
        //     quickBooks: quickBooks,
        //     physicalLocation: physicalLocation,
        //     notes: notes
        // })
        .then(res =>{
            if (res.data.error) {
                console.log(res.data.error.errors)
                setErrs(res.data.error.errors);
                console.log(errs);
                
            } else {
                {navigateHome();}
            }
        })
        .catch((err) =>{
            console.log(err);
        })
    }
    const navigateHome = ()=>{
        navigate('/');
    }
    const taxValue = (e, val) =>{
        setTaxForm(val)
    }    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const takeMeHome = () =>{
        navigate('/');
      }
      const helpMe =()=>{
          console.log(object.whoDonated)
      }
      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const [auth, setAuth] = React.useState(true);
    //   const useStyles = makeStyles((theme) => ({
        
    //   }));
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
                <MenuItem onClick={takeMeHome}>Take Me Home</MenuItem>
                <MenuItem onClick={() => (logout())}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
          <Typography variant="h6" className={classes.title}>
            Building Blocks - Update {object.item}
          </Typography>
          <Typography>{user.name}  &nbsp; &nbsp;</Typography>
          <Avatar alt={user.name} src={user.picture} />
        </Toolbar>
      </AppBar>
      <button onClick={helpMe}>Help</button>
      </ThemeProvider>
      <div className={classes.root}>
            <form  noValidate autoComplete='false' onSubmit={onSubmitHandler}>
                <br />
                <TextField
                    id="date"
                    label="Date In"
                    type="date"
                    defaultValue="2020-01-01"
                    className={classes.dateField}
                    onChange={e=>setDateIn(e.target.value)}
                    format={'DD/MM/YYYY'}
                    InputLabelProps={{
                shrink: true,
            }}
                />
                <TextField
                    id="date"
                    label="Date Out"
                    type="date"
                    defaultValue="2020-01-01"
                    className={classes.dateField}
                    onChange={e=>setDateOut(e.target.value)}
                    InputLabelProps={{
                shrink: true,
            }}
                />
                <br /><TextField id="standard-basic" label="Who donated?" className={classes.nameField} onChange={e=>setWhoDonated(e.target.value)} value={object.whoDonated} />
                <TextField id="standard-basic" label="Email Address" type="email" className={classes.container} onChange={e=>setDonorEmail(e.target.value)}/>
                <TextField id="standard-basic" label="Phone Number" className={classes.container} onChange={e=>setDonorPhoneNumber(e.target.value)}/>
                <TextField id="standard-basic" label="Street Address" className={classes.container} onChange={e=>setDonorAddress(e.target.value)}/><br />
            
                <Typography variant="h4" gutterBottom className={classes.Typography1}>
                    Equipment Info
                </Typography>
                <TextField id="standard-basic" label="Item" className={classes.container} onChange={e=>setItem(e.target.value)}/>
                <TextField id="standard-basic" label="Brand" className={classes.container} onChange={e=>setBrand(e.target.value)}/>
                <TextField id="standard-basic" label="Description" className={classes.container} onChange={e=>setDescription(e.target.value)}/>
                <TextField id="standard-basic" label="Serial Number" className={classes.container} onChange={e=>setSerialNumber(e.target.value)}/>
                <TextField id="standard-basic" label="Value" className={classes.container} onChange={e=>setValue(e.target.value)}/><br />
                
                <Typography variant="h4" gutterBottom className={classes.Typography2}>
                    Donated to:
                </Typography>
                <TextField id="standard-basic" label="Name" className={classes.nameField} onChange={e=>setDonateToName(e.target.value)}/>
                <TextField id="standard-basic" label="Email" className={classes.container} onChange={e=>setDonateToEmail(e.target.value)}/>
                <TextField id="standard-basic" label="Phone Number" className={classes.container} onChange={e=>setDonateToPhoneNumber(e.target.value)}/>
                <TextField id="standard-basic" label="Street Address" className={classes.container} onChange={e=>setDonateToAddress(e.target.value)}/><br />
                
                <p>{String(taxForm)}</p>
                <Switch
                color="primary"
                onChange={taxValue}
                />
                    
                    {/* <FormGroup row className={classes.checkbox}>
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedA} onChange={e=>setTaxForm(e.target.value)} name="checkedA" color="primary" className={classes.container}/>}
                        label="Tax form sent to donor?"
                    /><br />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedA" color="primary" className={classes.container}/>}
                        label="Thank you sent?"
                    /><br />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChange} name="checkedA" color="primary" className={classes.container}/>}
                        label="Entered in QuickBooks?"
                    />
                </FormGroup> */}
            
                <TextField id="standard-basic" label="Physical BB4K Location" className={classes.container} onChange={e=>setPhysicalLocation(e.target.value)}/>
                <TextField id="standard-basic" label="Notes" className={classes.container} onChange={e=>setNotes(e.target.value)}/><br />
                <Button variant="contained" color="primary" className={classes.submit} type="submit" >
                    Submit
                </Button>
            </form>
        </div>
      </div>

  ));
}