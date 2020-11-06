import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'fontsource-roboto'
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import axios from 'axios'
import Button from '@material-ui/core/Button'
import { navigate } from '@reach/router';

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
    }
  }));
export default props =>{
    const [dateIn, setDateIn] = useState();
    const [dateOut, setDateOut] = useState();
    const [whoDonated, setWhoDonated] = useState("");
    const [donorEmail, setDonorEmail] = useState("");
    const [donorPhoneNumber, setDonorPhoneNumber] = useState("");
    const [donorAddress, setDonorAddress] = useState("");
    const [item, setItem] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [value, setValue] = useState("");
    const [donateToName, setDonateToName] = useState("");
    const [donateToEmail, setDonateToEmail] = useState("");
    const [donateToPhoneNumber, setDonateToPhoneNumber] = useState("");
    const [donateToAddress, setDonateToAddress] = useState("");
    const [taxForm, setTaxForm] = React.useState(false);
    const [thankYou, setThankYou] = React.useState(false);
    const [quickBooks, setQuickBooks] = React.useState(false);
    const [physicalLocation, setPhysicalLocation] = useState("");
    const [notes, setNotes] = useState("");
    const [setErrs] = useState("");
    const classes = useStyles();
    
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/new', {
            dateIn: dateIn,
            dateOut: dateOut,
            whoDonated: whoDonated,
            donorEmail: donorEmail,
            donorPhonenumber: donorPhoneNumber,
            donorAddress: donorAddress,
            item: item,
            brand: brand,
            description: description,
            serialNumber: serialNumber,
            value: value,
            donateToName: donateToName,
            donateToEmail: donateToEmail,
            donateToPhoneNumber: donateToPhoneNumber,
            donateToAddress: donateToAddress,
            taxForm: taxForm,
            thankYou: thankYou,
            quickBooks: quickBooks,
            physicalLocation: physicalLocation,
            notes: notes
        })
        .then((res) =>{
            if (res.data.error) {
                console.log(res.data.error.errors)
                setErrs(res.data.error.errors);
                console.log(res.data.error);
                
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
    const thankYouValue = (e, val) =>{
        setThankYou(val)
    }    
    const quickBooksValue = (e, val) =>{
        setQuickBooks(val)
    }    
    return(
        <div className={classes.root}>
            <form  noValidate autoComplete='false' onSubmit={onSubmitHandler}>
                <br />
                <TextField
                    id="date"
                    label="Date In"
                    type="date"
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
                    className={classes.dateField}
                    onChange={e=>setDateOut(e.target.value)}
                    error={dateOut < dateIn}
                    InputLabelProps={{
                shrink: true,
            }}
                />
                <br /><TextField id="standard-basic" label="Who donated?" className={classes.nameField} onChange={e=>setWhoDonated(e.target.value)} />
                <TextField id="standard-basic" label="Email Address" type="email" className={classes.container} onChange={e=>setDonorEmail(e.target.value)}/>
                <TextField id="standard-basic" label="Phone Number" className={classes.container} onChange={e=>setDonorPhoneNumber(e.target.value)}/>
                <TextField id="standard-basic" label="Full Street Address" className={classes.container} onChange={e=>setDonorAddress(e.target.value)}/><br />
                <br /><hr />
                <Typography variant="h4" gutterBottom className={classes.Typography1}>
                    Equipment Info
                </Typography>
                <TextField id="standard-basic" label="Item" className={classes.container} onChange={e=>setItem(e.target.value)}/>
                <TextField id="standard-basic" label="Brand" className={classes.container} onChange={e=>setBrand(e.target.value)}/>
                <TextField id="standard-basic" label="Description" className={classes.container} onChange={e=>setDescription(e.target.value)}/>
                <TextField id="standard-basic" label="Serial Number" className={classes.container} onChange={e=>setSerialNumber(e.target.value)}/>
                <TextField id="standard-basic" label="Value" className={classes.container} onChange={e=>setValue(e.target.value)}/><br />
                <br /><hr />
                <Typography variant="h4" gutterBottom className={classes.Typography2}>
                    Donated to:
                </Typography>
                <TextField id="standard-basic" label="Name" className={classes.nameField} onChange={e=>setDonateToName(e.target.value)}/>
                <TextField id="standard-basic" label="Email" className={classes.container} onChange={e=>setDonateToEmail(e.target.value)}/>
                <TextField id="standard-basic" label="Phone Number" className={classes.container} onChange={e=>setDonateToPhoneNumber(e.target.value)}/>
                <TextField id="standard-basic" label="Street Address" className={classes.container} onChange={e=>setDonateToAddress(e.target.value)}/><br />
                <br /><hr />
                <Typography display="inline" id="standard-basic" className={classes.switchLabel}>Tax form sent to donor?</Typography>
                <Switch
                color="primary"
                onChange={taxValue}
                required="false"
                />
                <Typography display="inline" id="standard-basic" className={classes.switchLabel}>Thank You sent?</Typography>
                <Switch
                color="primary"
                onChange={thankYouValue}
                required="false"
                />
                <Typography display="inline" id="standard-basic" className={classes.switchLabel}>Entered in QuickBooks?</Typography>
                <Switch
                color="primary"
                onChange={quickBooksValue}
                required="false"
                />
                <TextField id="standard-basic" label="Physical BB4K Location" className={classes.container} onChange={e=>setPhysicalLocation(e.target.value)}/>
                <TextField id="standard-basic" label="Notes" className={classes.container} onChange={e=>setNotes(e.target.value)}/><br />
                <Button variant="contained" color="primary" className={classes.submit} type="submit" >
                    Submit
                </Button>
            </form>
        </div>
    )
}