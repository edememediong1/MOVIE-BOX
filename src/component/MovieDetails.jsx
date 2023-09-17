import YouTube from "react-youtube";
import PropTypes from 'prop-types';


function MovieDetail({movie}){
    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <YouTube/>
        </div>
    )
}

MovieDetail.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      poster_path: PropTypes.img// Define title as a required string prop
      // Other properties of the 'movie' object and their prop validations
    }).isRequired,
    selectMovie: PropTypes.func.isRequired,
   
  };

export default MovieDetail;