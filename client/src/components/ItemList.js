import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import { red } from '@material-ui/core/colors';




const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  TableHead: {
      fontSize: 20,
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



  
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
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.item}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.brand}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}