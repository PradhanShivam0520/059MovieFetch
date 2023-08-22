export default function MoviesWatched({ watched, setWatched, onDeleteWatch }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchList
          movie={movie}
          key={movie.imdbID}
          onDeleteWatch={onDeleteWatch}
        />
      ))}
    </ul>
  );
}

function WatchList({ movie, onDeleteWatch }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{!isNaN(movie.imdbRating) ? movie.imdbRating : 6.7} imdb</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{!isNaN(movie.userRating) ? movie.userRating : 0}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{!isNaN(movie.runtime) ? movie.runtime : 0} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatch(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
