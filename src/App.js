import React, { useEffect, useState } from 'react';
import './App.css';
import { getMovieList, searchMovie } from "./api";
import MovieDetail from './MovieDetail';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    if (popularMovies.length === 0) {
      return <div className="No-results">Tidak ada hasil penelusuran</div>;
    }

    return popularMovies.map((movie, i) => (
      <div className="Movie-wrapper" key={i} onClick={() => setSelectedMovie(movie)}> 
        <div className="Movie-title">{movie.title}</div>
        <img
          className="Movie-image"
          src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          onLoad={() => setLoading(false)}
          alt='gambar gabisa di load'
        />
        {loading && <div className="Loading-animation" />}
        <div className="Movie-date">Release : {movie.release_date}</div>
        <div className="Movie-rate">Rating : {movie.vote_average}</div>
      </div>
    ));
  };

  const search = async (q) => {
    if (q.length > 3) {
      setLoading(true);
      const query = await searchMovie(q);
      setPopularMovies(query.results);
      setLoading(false);
    } else {
      setLoading(true);
      getMovieList().then((result) => {
        setPopularMovies(result);
        setLoading(false);
      });
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>ZMOVIE</h1>
        <input
          type="text"
          placeholder="Cari film"
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          {selectedMovie ? (
            <MovieDetail movie={selectedMovie} />
          ) : (
            <PopularMovieList />
          )}
        </div>
      </header>
    </div>
  );
};

export default App;
