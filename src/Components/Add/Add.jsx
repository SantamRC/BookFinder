import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useSelector} from 'react-redux'
 
const useStyles = makeStyles((theme) => ({
   
      container: {
       
      },
      textField: {
        width:'70vw',
        marginTop:'20px',
        [theme.breakpoints.up('sm')]:{
          width:'30vw',
          marginTop:'20px',
        }
      },
    
    paper:{
      height:'50vh',
      width:'90vw',
      margin:'auto',
      marginTop:'20px',
      [theme.breakpoints.up('sm')]:{
        height:'50vh',
        width:'40vw',
        margin:'auto',
        marginTop:'20px',
      }
    }
  }));

export default function Add() {
    const classes = useStyles()
    const state=useSelector(state =>state)
    let [title,setTitle]=useState('')
    let [author,setAuthor]=useState('')
    let [date,setDate]=useState('2021-07-11')

    const onSubmit=()=> {
      let body={
        Title:title,
        Author:author,
        Date:date
      }
      axios.post(`${process.env.REACT_APP_HOST}/add/${state.username}`,
      body,
      {
        headers: { Authorization: `Bearer ${state.token}` }
      }
      ).then((res) => {
        console.log(res.data)
      }).catch(err=> console.log(err))
    }

    return (
      <Paper elevation={3} className={classes.paper} >
        <form className={classes.container} Validate autoComplete="off">
          <Grid container
              direction="column"
              justifyContent="center"
              alignItems="center">
            <TextField 
              required
              id="standard-basic" 
              label="Title" 
              className={classes.textField} 
              onChange={(e)=>setTitle(e.target.value)}
            />
            <TextField 
              required
              id="standard-basic" 
              label="Author" 
              className={classes.textField} 
              onChange={(e)=>setAuthor(e.target.value)}
            />
            <TextField
                id="date"
                label="Date Published"
                type="date"
                defaultValue="2021-07-11"
                format="yyyy-mm-dd"
                className={classes.textField}
                onChange={(e)=>setDate(e.target.value)}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <Button onClick={()=>onSubmit()} className={classes.textField} variant="contained" color='primary'>Submit</Button>
            </Grid>
        </form>
        </Paper>
    )
}

