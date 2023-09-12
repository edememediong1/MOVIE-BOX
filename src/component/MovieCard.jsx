
import PropTypes from 'prop-types';

function MovieCard({movie}){
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/"
    return (
          <div data-testid="movie-card" id="movie-card">
              {movie.poster_path ? <img src= {`${IMAGE_PATH}${movie.poster_path}`} data-testid="movie-poster" alt='movie-poster'/>
                : null}
              <p data-testid="movie-title">{movie.title}</p>

          </div> )
      }

MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
       poster_path: PropTypes.img.isRequired// Define title as a required string prop
      // Other properties of the 'movie' object and their prop validations
    }).isRequired,
  };

export default MovieCard;