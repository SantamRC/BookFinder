import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
   
      container: {
       
      },
      textField: {
        width:'30vw',
        marginTop:'20px'
      },
    
    paper:{
      height:'50vh',
      width:'40vw',
      margin:'auto',
      marginTop:'20px'
    }
  }));

export default function Add() {
    const classes = useStyles()
    let [title,setTitle]=useState('')
    let [author,setAuthor]=useState('')
    let [date,setDate]=useState('2021-07-11')

    const onSubmit=()=> {
      let body={
        Title:title,
        Author:author,
        Date:date
      }
      // axios.post('https://bookfinder101.herokuapp.com/add',body).then((res) => {
      //   console.log(res.data)
      // }).catch(err=> console.log(err))
      let data=JSON.parse(localStorage.getItem('books'))
      if(data){
        data.push(body)
      }else{
        data=[]
        data.push(body)
      }
      
      localStorage.setItem('books',JSON.stringify(data))
      console.log(JSON.parse(localStorage.getItem('books')))
    }

    return (
      <Paper elevation={3} className={classes.paper} >

     
        <form onSubmit={()=>onSubmit()} className={classes.container} Validate autoComplete="off">
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
            <Button className={classes.textField} type='submit' variant="contained" color='primary'>Submit</Button>
            </Grid>
        </form>
        </Paper>
    )
}

