import React,{useState,useEffect} from 'react'
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'blue',
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
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
      display: 'flex'
    },
    card:{
      backgroundColor:'rgb(166, 164, 164)',
      width: '20%',
      marginRight:'5%'
    }
}
));

export default function Landing() {
    const classes = useStyles();
    let [books,setBooks]=useState([])

    useEffect(() =>{
      axios.get('http://localhost:5000/books').then((res) => {
        console.log('The books are: '+res)
        setBooks(res.data)
      })
    })

    const onDelete=(name)=>{
      axios.delete('http://localhost:5000/delete',{
        Title:name
      }).then((res) => {
        setBooks(res.data)
      })
    }

    return (
        <div>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
          </div>
          <div className={classes.books}>
            {
              books.map((book) =>(
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {book.Title}
                    </Typography>
                    <Typography variant="body2" component="p">
                    {book.Author}
                    </Typography>
                    <Typography variant="body2" component="h3">
                    {book.Date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                    onClick={()=>onDelete(book.Title)}
                    color="secondary" 
                    size="small">Delete</Button>
                  </CardActions>
                </Card>
              ))
            }
          </div>
        </div>
    )
}
