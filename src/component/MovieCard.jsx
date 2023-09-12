
import PropTypes from 'prop-types';

function MovieCard({movie}){
    return (
        <div>
            {movie.title}
        </div>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired, // Define title as a required string prop
      // Other properties of the 'movie' object and their prop validations
    }).isRequired,
  };

export default MovieCard;