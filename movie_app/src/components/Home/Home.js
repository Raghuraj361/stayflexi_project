import { Button, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
      backgroundColor: "gray",
      borderRadius: "8px"
    },
  },

}))

function Home() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const searchData = () => {
    searchApiCall(searchInput);
  }
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  }
  const searchApiCall = (searchString) => {
    setIsLoading(true);
    fetch(`https://www.omdbapi.com/?s=${searchString}&apikey=4439a98b`).then(
      (result) => {
        result.json().then((resp) => {
          // sorting movie year
          const content = resp['Search']
           content.sort ((a, b) => {
            return (parseInt(b.Year) - parseInt(a.Year)) * (-1) 
          })
          setData(content);
          setIsLoading(false);
        });
      }
    );
  }

  useEffect(() => {
    searchApiCall("inception");
  }, []);

  return (
    <div>
          <InputBase
              onChange={handleSearchInput}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
      <Button onClick={searchData}>Search</Button>
      {isLoading && (<CircularProgress/>)}
      <div className="container">
      {!isLoading &&
      data.map((movies, i) => (

        <div key={i} className='map'>
          <Link to={`/details/${movies.imdbID}`}>
          <img src={movies.Poster} alt="#" />
          </Link>
          <p>Title : {movies.Title}</p>
          <p>Release Year : {movies.Year}</p>
        </div>
      
      ))}
    </div>
    </div>
  );
}

export default Home;