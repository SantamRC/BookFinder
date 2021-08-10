import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import action from '../../Redux/action'

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
      height:'55vh',
      width:'90vw',
      margin:'auto',
      marginTop:'20px',
      [theme.breakpoints.up('sm')]:{
        height:'55vh',
        width:'40vw',
        margin:'auto',
        marginTop:'20px',
      }
    }
  }));

export default function Auth() {
    const classes = useStyles()
    const dispatch=useDispatch()
    let [isSignup,setSignup]=useState(false)
    let [user,setUser]=useState('')
    let [name,setName]=useState('')
    let [pass,setPass]=useState('')

    const onSubmit=()=> {
      if(isSignup) {
        axios.post(`${process.env.REACT_APP_HOST}/signup`,{
          username:user,
          name:name,
          password:pass
        }).then((res) => {
          console.log(res.data)
        }).catch((err) => {
          console.log(err.response.status)
        })
      }else{
        axios.post(`${process.env.REACT_APP_HOST}/login`,{
          username:user,
          password:pass
        }).then((res) => {
          console.log(res.data)
          dispatch(action(
            res.data.result.username,
            res.data.result.name,
            res.data.token
          ))
        }).catch((err) => {
          if(err.response.status===404){
            alert('Invalid Credentials')
          }
          console.log(err)
        })
      }
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
              label="Username"
              className={classes.textField} 
              onChange={(e)=>setUser(e.target.value)}
            />
            {isSignup && <TextField 
              required
              id="standard-basic"
              label="Full Name"
              className={classes.textField} 
              onChange={(e)=>setName(e.target.value)}
            />}
            <TextField
                required
                id="standard-basic"
                label="Password"
                className={classes.textField}
                onChange={(e)=>setPass(e.target.value)}
            />
            {isSignup && <TextField
                required
                id="standard-basic"
                label="Confirm Password"
                className={classes.textField}
                onChange={(e)=>setPass(e.target.value)}
            />}
            <Button className={classes.textField} onClick={()=>onSubmit()} variant="contained" color='primary'>
                {isSignup?("Signup"):("Login")}
            </Button>
            <Typography variant="h5" onClick={()=>setSignup(!isSignup)}>
                {isSignup?("Already Signed Up? Login Here"):("Do not have an account? Signup Here")}
            </Typography>
            </Grid>
        </form>
        </Paper>
    )
}

