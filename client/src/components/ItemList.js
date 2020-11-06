import React, {useState,useEffect} from 'react';
import {navigate} from '@reach/router'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  TableHead: {
      fontSize: 20,
  }
});
  export default function BasicTable() {
    const [item, setItem] = useState([]);
    const classes = useStyles();
    useEffect(() =>{
        getAllItems();
    },[]);
    
    const getAllItems = (res) =>{
    axios.get("http://localhost:8000/api/users/")
        .then(res=>{
            setItem(res.data.users)
            console.log(res.data.users)})
        .catch((err) =>{
            console.log(err)
        })
}
  return (
  <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell><b>Item</b></TableCell>
            <TableCell align="right"><b>Description</b></TableCell>
            <TableCell align="right"><b>Brand</b></TableCell>
            <TableCell align="right"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.map((row,idx) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">{row.item}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.brand}</TableCell>
              <TableCell align="right">
                <Button onClick={navigate.bind(this, '/edit/'+row._id)}>
                Details
                </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}