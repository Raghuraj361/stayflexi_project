import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


function Details() {

    const [data, setData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
       
      fetch(`https://www.omdbapi.com/?i=${id}&apikey=4439a98b`).then(
        (result) => {
          result.json().then((resp) => {
            setData(resp);
          });
        }
      );
    }, []);

  return (
    <div>
      {[data].map((movies, i) => (
        
        <div key={i} className='mapDetails'>
          
          <img src={movies.Poster} alt="#" />
          <p className="title"> Title : {movies.Title}</p>
          <p className="year">Release Year : {movies.Released}</p>
          <p>Language : {movies.Language}</p>
          <p>Synopsis : {movies.Plot}</p>
          
        </div>
      
      ))}
    </div>
  )
}

export default Details;
