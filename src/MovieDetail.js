import React from "react";

const MovieDetail = ({ movie }) => {
    return (
      <div className="Movie-detail">
        
        <img
          src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          alt={movie.title}
        />
        <p className="judulok">{movie.title}</p>
        <p>Tanggal Rilis: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>{movie.overview}</p>
      </div>
    );
  };
  
  export default MovieDetail;
  