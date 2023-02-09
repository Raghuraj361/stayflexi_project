//import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home(props) {
  const [data, setData] = useState([]);


  const searchData = () => {
    console.log(props.tempVlue);
  }

  useEffect(() => {
    fetch("http://www.omdbapi.com/?s=inception&apikey=4439a98b").then(
      (result) => {
        result.json().then((resp) => {
          console.warn(resp);
          setData(resp['Search']);
          // sorting movie year
           data.sort ((a, b) => {
            return b.Released - a.Released
          })
        });
      }
    );
  }, []);
  //console.warn(data);

  return (
    <div className="container">
      {/* <Button onClick={searchData}>Search</Button> */}
      {data.map((movies, i) => (
        
        <div key={i} className='map'>
          <Link to={`/details/${movies.imdbID}`}>
          <img src={movies.Poster} alt="#" />
          </Link>
          <p>Title : {movies.Title}</p>
          <p>Release Year : {movies.Released}</p>
        </div>
      
      ))}
    </div>
  );
}

export default Home;