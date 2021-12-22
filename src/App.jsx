import React, { useEffect, useState } from "react"
import './App.css';

const setVoteClass = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }

}

const Movies = () => {
  const imgurl = "https://image.tmdb.org/t/p/w500"
  const [cinemas, setCinema] = useState([])
  const [next, setNext] = useState(1);

  function handleClickNext(event) {
    event.preventDefault();
    setNext((prevValue) => {
      return prevValue + 1;
    });
  }
  function handleClickPrev(event) {
    event.preventDefault();
    if (next === 1) {
      console.log("end of list");
    } else {
      setNext((prevValue) => {
        return prevValue - 1;
      });
    }
  }

  useEffect(() => {
    getMovies()
  }, [next])

  const getMovies = async () => {
    try {
      const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2f79b71c97822eb7f53b3e412154f43e&page=${next}`);

      if (data.status === 200) {
        const movies = await data.json()
        console.log(movies.results)
        setCinema(movies.results)
      } else if (data.status === 401) {
        console.log('Your key is incorrect')
      } else if (data.status === 404) {
        console.log('The movie your are looking for does not exist')
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <h1 className='text-title'>Popular movies of the moment</h1>

      <section className='container_movies'>

        {
          cinemas.map((cinema) => (
            <div className='container_names' key={cinema.id}>
              <div className='container_information'>
                <img className='container-images' src={`${imgurl + cinema.poster_path}`} alt='images-movies' />
                <div className='container_overview'>
                  <h2 className='text-overviewtitle'>Overview:</h2>
                  <p className='text-overview'>{cinema.overview}</p>
                </div>
              </div>
              <div className='container_text'>
                <p className='text-names' >{cinema.title}</p>
                <p className={
                  `tag ${setVoteClass(cinema.vote_average)}`}>{cinema.vote_average}</p>
              </div>
            </div>

          ))}
      </section>
      <div className='container_page'>
        <button className='text-page' onClick={handleClickPrev}>Prev</button>
        <button className='text-page' onClick={handleClickNext}>Next</button>
      </div>
    </div>
  );
}

export default Movies;
