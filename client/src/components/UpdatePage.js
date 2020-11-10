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
      marginBottom: "20px"
    },
    dateField1: {
      marginLeft: "19%",
      width: '241px',
      paddingBottom: '50px'
    },
    dateField2: {
      marginLeft: '10%',
      width: '253px',
    },
    nameField: {
        marginBottom: "2px",
        marginLeft: "5%",
        width: "275px"
    },
    Typography1: {
        marginLeft: "36%",
    },
    Typography2: {
        marginLeft: "38%",
    },
    checkbox: {
        display: 'inline',
    },
    submit: {
        float: "right",
        margin: "20px"
    },
    input: {
        width: '300px'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    switchLabel: {
      display: "inline"
    }
      
  }));

export default props => {
    const [dateIn, setDateIn] = useState();
    const [dateOut, setDateOut] = useState();
    const [whoDonated, setWhoDonated] = useState("");
    const [donorEmail, setDonorEmail] = useState();
    const [donorPhonenumber, setDonorPhonenumber] = useState();
    const [donorAddress, setDonorAddress] = useState();
    const [item, setItem] = useState();
    const [brand, setBrand] = useState();
    const [description, setDescription] = useState();
    const [serialNumber, setSerialNumber] = useState();
    const [value, setValue] = useState();
    const [donateToName, setDonateToName] = useState();
    const [donateToEmail, setDonateToEmail] = useState();
    const [donateToPhonenumber, setDonateToPhonenumber] = useState();
    const [donateToAddress, setDonateToAddress] = useState();
    const [taxForm, setTaxForm] = React.useState(false);
    const [thankYou, setThankYou] = React.useState(false);
    const [quickBooks, setQuickBooks] = React.useState(false);
    const [physicalLocation, setPhysicalLocation] = useState();
    const [notes, setNotes] = useState();
    const [errs, setErrs] = useState();
    const {isAuthenticated} = useAuth0();
    const {user,logout} = useAuth0();
    const classes = useStyles();
    
    useEffect(() =>{
        axios.get("http://localhost:8000/api/users/" + props.id)
        .then(res=>{
          setDateIn(res.data.user.dateIn);
          setDateOut(res.data.user.dateOut);
          setWhoDonated(res.data.user.whoDonated);
          setDonorEmail(res.data.user.donorEmail);
          setDonorAddress(res.data.user.donorAddress);
          setDonorPhonenumber(res.data.user.donorPhonenumber);
          setItem(res.data.user.item);
          setBrand(res.data.user.brand);
          setDescription(res.data.user.description);
          setSerialNumber(res.data.user.serialNumber);
          setValue(res.data.user.value);
          setDonateToName(res.data.user.donateToName);
          setDonateToEmail(res.data.user.donateToEmail);
          setDonateToPhonenumber(res.data.user.donateToPhonenumber);
          setDonateToAddress(res.data.user.donateToAddress);
          setTaxForm(res.data.user.taxForm);
          setThankYou(res.data.user.thankYou);
          setQuickBooks(res.data.user.quickBooks);
          setPhysicalLocation(res.data.user.physicalLocation);
          setNotes(res.data.user.notes);
            })
        .catch((err) =>{
            console.log(err)
            })
    }, []);
    
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:8000/api/users/update/' + props.id, {
            dateIn: dateIn,
            dateOut: dateOut,
            whoDonated: whoDonated,
            donorEmail: donorEmail,
            donorPhonenumber: donorPhonenumber,
            donorAddress: donorAddress,
            item: item,
            brand: brand,
            description: description,
            serialNumber: serialNumber,
            value: value,
            donateToName: donateToName,
            donateToEmail: donateToEmail,
            donateToPhonenumber: donateToPhonenumber,
            donateToAddress: donateToAddress,
            taxForm: taxForm,
            thankYou: thankYou,
            quickBooks: quickBooks,
            physicalLocation: physicalLocation,
            notes: notes
        })
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
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const takeMeHome = () =>{
        navigate('/');
      }
      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const [auth] = React.useState(true);
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
            Building Blocks - Update {item}
          </Typography>
          <Typography>{user.name}  &nbsp; &nbsp;</Typography>
          <Avatar alt={user.name} src={user.picture} />
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      <div className={classes.root}>
            <form  noValidate autoComplete='false' onSubmit={onSubmitHandler}>
                <br />
                <div className="dateInputs">
                <TextField
                    id="date"
                    label="Select New Date In (if applicable)"
                    type="date"
                    value={dateIn}
                    className={classes.dateField1}
                    onChange={e=>setDateIn(e.target.value)}
                    format={'DD/MM/YYYY'}
                    InputLabelProps={{
                shrink: true,
            }}
                />
                <TextField
                  id="date"
                  label="Select New Date Out (if applicable)"
                  type="date"
                  value={dateOut}
                  className={classes.dateField2}
                  onChange={e=>setDateOut(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </div>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Who donated?" className={classes.nameField} onChange={e=>setWhoDonated(e.target.value)} value={whoDonated} />
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Email Address" type="email" className={classes.nameField} onChange={e=>setDonorEmail(e.target.value)} value={donorEmail}/>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Phone Number" className={classes.nameField} onChange={e=>setDonorPhonenumber(e.target.value)} value={donorPhonenumber}/>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Street Address" className={classes.nameField} onChange={e=>setDonorAddress(e.target.value)} value={donorAddress}/><br />
                <br /><hr />
                <Typography variant="h4" gutterBottom className={classes.Typography1}>
                    Equipment Info
                </Typography>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Item" className={classes.nameField} onChange={e=>setItem(e.target.value)} value={item}/>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Brand" className={classes.nameField} onChange={e=>setBrand(e.target.value)} value={brand}/>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Description" className={classes.nameField} onChange={e=>setDescription(e.target.value)} value={description}/>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Serial Number" className={classes.nameField} onChange={e=>setSerialNumber(e.target.value)} value={serialNumber}/>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Value" className={classes.nameField} onChange={e=>setValue(e.target.value)} value={value}/><br />
                <br /><hr />
                <Typography variant="h4" gutterBottom className={classes.Typography2}>
                    Donated to:
                </Typography>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Name" className={classes.nameField} onChange={e=>setDonateToName(e.target.value)} value={donateToName}/>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Email" className={classes.nameField} onChange={e=>setDonateToEmail(e.target.value)} value={donateToEmail}/>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Phone Number" className={classes.nameField} onChange={e=>setDonateToPhonenumber(e.target.value)} value={donateToPhonenumber}/>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Street Address" className={classes.nameField} onChange={e=>setDonateToAddress(e.target.value)} value={donateToAddress}/><br />
                <br /><hr />
                <div className="switchDiv">
                <Typography id="standard-basic" className={classes.switchLabel}>Tax form sent to donor?</Typography>
                <Switch
                color="primary"
                onChange={e=>setTaxForm(e.target.checked)}
                required="false"
                checked={taxForm}
                className={classes.switch}
                />
                <Typography id="standard-basic" className={classes.switchLabel}>Thank You sent?</Typography>
                <Switch
                color="primary"
                onChange={e=>setThankYou(e.target.checked)}
                required="false"
                checked={thankYou}
                className={classes.switch}
                />
                <Typography id="standard-basic" className={classes.switchLabel}>Entered in QuickBooks?</Typography>
                <Switch
                color="primary"
                onChange={e=>setQuickBooks(e.target.checked)}
                required="false"
                checked={quickBooks}
                className={classes.switch}
                />
                </div><br />
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Physical BB4K Location" className={classes.nameField} onChange={e=>setPhysicalLocation(e.target.value)} value={physicalLocation}/>
                <TextField InputLabelProps={{ shrink: true }} id="standard-basic" label="Notes" className={classes.nameField} onChange={e=>setNotes(e.target.value)} value={notes}/><br />
                <Button variant="contained" color="primary" className={classes.submit} type="submit" >
                    Update Item
                </Button>
            </form>
        </div>
      </div>

  ));
}