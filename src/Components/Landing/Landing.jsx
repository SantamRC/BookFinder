import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios'
import Fuse from 'fuse.js'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: '200px',
      backgroundColor: 'rgb(2, 190, 247)',
      '&:hover': {
        backgroundColor: 'rgb(145, 225, 250)',
      },
      left:'5vw',
      top:'2vh',
      width: '90vw',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '70vw',
        left:'15vw',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    books:{
     
    },
    card:{
      backgroundColor:'rgb(166, 164, 164)',
      width: '80vw',
      marginLeft:'10vw',
      marginTop:'5vh',
      borderRadius: '10px',
      [theme.breakpoints.up('sm')]:{
        backgroundColor:'rgb(166, 164, 164)',
        marginLeft:'1vw',
        width: '20vw',
        marginRight:'5%',
        borderRadius: '10px',
      }
    }
}
));

export default function Landing() {
    const classes = useStyles();
    let [books,setBooks]=useState([])

    // useEffect(() =>{
    //   axios.get('https://bookfinder101.herokuapp.com/books').then((res) => {
    //     console.log('The books are: '+res)
    //     setBooks(res.data)
    //   })
    //   // let data=JSON.parse(localStorage.getItem('books'))
    //   // setBooks(data)
    // },[])
    useEffect(()=>{
      let data=JSON.parse(localStorage.getItem('books'))
      if(data){
        setBooks(data)
      }
    },[])

    const query=(search)=>{
      const options={
        keys:['Title','Author']
      }
      const fuse=new Fuse(books, options)    
      const result=fuse.search(search)
      console.log(result)
      let temp=[]
      result.forEach(item=>{
        temp.push(item.item)
      })
      setBooks(temp)
    }

    const onDelete=(name)=>{
      console.log("The book to be deleted: "+name)
      // axios.delete('https://bookfinder101.herokuapp.com/delete',{
      //   data:{
      //     data:{Title:name}
      //   }
      // }).then((res) => {
      //   console.log(res.data)
      //   setBooks(res.data)
      // })
      let data=JSON.parse(localStorage.getItem('books'))
      data.forEach((item,index)=>{
        if(item.Title==name){
          delete data[index]
        }
      })
      let res=[]
      data.forEach(item=>{
        if(item){
          res.push(item)
        }
      })
      setBooks(res)
      localStorage.setItem('books',JSON.stringify(res))
    }

    return (
        <div>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                placeholder="Search…"
                onChange={(e)=>{
                  query(e.target.value)
                }}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
          </div>
          <div className={classes.books} >
          <Grid container spacing={3}>
            {
              books.map((book) =>(
                <Grid item sm={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography align='center' variant="h3">
                      {book.Title}
                    </Typography>
                    <Typography align='center' variant="h5" component="p">
                    {book.Author}
                    </Typography>
                    <Typography align='center' variant="h5" component="h3">
                    {book.Date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                    style={{margin:'auto'}}
                    onClick={()=>onDelete(book.Title)}
                    color="secondary" 
                    variant="contained"
                    size="small">Delete</Button>
                  </CardActions>
                </Card>
                </Grid>
              ))
            }
            </Grid>
          </div>
        </div>
    )
}
