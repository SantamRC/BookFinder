import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
      container: {
        width: '25ch',
        margin:'auto'
      },
      textField: {
        marginTop:200,
        display: 'block',
      },
    },
  }));

export default function Add() {
    const classes = useStyles()
    let [title,setTitle]=useState('')
    let [author,setAuthor]=useState('')
    let [date,setDate]=useState('')

    const onSubmit=()=> {
      let body={
        Title:title,
        Author:author,
        Date:date
      }
      axios.post('http://localhost:5000/add',body).then((res) => {
        console.log(res.data)
      }).catch(err=> console.log(err))
    }

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField 
              id="standard-basic" 
              label="Title" 
              className={classes.textField} 
              onChange={(e)=>setTitle(e.target.value)}
            />
            <TextField 
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
                className={classes.textField}
                onChange={(e)=>setDate(e.target.value)}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <Button onClick={()=>onSubmit()} variant="contained" color='primary'>Submit</Button>
        </form>
    )
}
