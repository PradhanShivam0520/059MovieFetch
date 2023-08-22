const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function Summary({ children, watched }) {
  const avgImdbRating = average(
    watched.map((movie) => (isNaN(movie.imdbRating) ? 5 : movie.imdbRating))
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => (!isNaN(movie.userRating) ? movie.userRating : 0))
  ).toFixed(2);
  const avgRuntime = average(
    watched.map((movie) => (!isNaN(movie.runtime) ? movie.runtime : 0))
  );

  return (
    <div className="summary">
      <h2>{children}</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(1)} min</span>
        </p>
      </div>
    </div>
  );
}
