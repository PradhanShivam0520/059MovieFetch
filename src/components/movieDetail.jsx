import { useEffect, useState } from "react";
import Loader from "./loader";
import StarRating from "../star";
import { useKeydownKey } from "../custom Hooks/useKey";

const MovieDetails = function ({
  selectedId,
  setErrorMessage,
  setSelectedId,
  onClickAdd,
  watched,
}) {
  const [details, setDetails] = useState({});
  const [isMovieLoading, setIsMovieLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const OnClose = () => {
    setSelectedId("");
  };
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const {
    Actors: actors,
    Director: director,
    Poster: poster,
    Genre: genre,
    Plot: plot,
    Released: released,
    Title: title,
    Country: country,
    Language: language,
    Runtime: runtime,
    imdbRating,
    Year: year,
    imdbID,
  } = details;

  useKeydownKey("Escape", OnClose);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setIsMovieLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?i=${selectedId}&apikey=c4afdb74`
        );
        const data = await res.json();
        setDetails(data);
      } catch (err) {
      } finally {
        setIsMovieLoading(false);
      }
    };
    fetchMovieDetail();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    //cleanup effect...
    return function () {
      document.title = "movieSearch";
    };
  }, [title]);

  return (
    <>
      <div className="details">
        {isMovieLoading ? (
          <Loader>Loading Details...</Loader>
        ) : (
          <>
            <DetailsHeader
              country={country}
              language={language}
              imdbRating={imdbRating}
              released={released}
              runtime={runtime}
              year={year}
              title={title}
              poster={poster}
              OnClose={OnClose}
              genre={genre}
            />

            <DetailsSection
              plot={plot}
              actors={actors}
              director={director}
              setUserRating={setUserRating}
              imdbRating={imdbRating}
              runtime={runtime}
              userRating={userRating}
              title={title}
              poster={poster}
              imdbID={imdbID}
              onClickAdd={onClickAdd}
              isWatched={isWatched}
            />
          </>
        )}
      </div>
    </>
  );
};

function DetailsHeader({
  country,
  language,
  imdbRating,
  imdbID,
  runtime,
  year,
  released,
  title,
  poster,
  OnClose,
  genre,
}) {
  return (
    <header>
      <button className="btn-back" onClick={() => OnClose()}>
        &larr;
      </button>
      <img src={poster} alt={`poster of ${title}`} />
      <div className="details-overview">
        <p>{title}</p>
        <p>
          {released !== "N/A" ? released : year} &bull;{" "}
          {runtime !== "N/A" ? runtime : ""}
        </p>
        <p>{genre !== "N/A" ? genre : ""}</p>
        {imdbRating === "N/A" ? (
          ""
        ) : (
          <p>
            <span>🌟</span> {imdbRating} imdb Rating
          </p>
        )}
        <p>
          {country !== "N/A" ? <span>Country {country}</span> : ""}
          {language !== "N/A" ? <span>Language {language}</span> : ""}
        </p>
      </div>
    </header>
  );
}

const DetailsSection = ({
  plot,
  actors,
  director,
  setUserRating,
  imdbRating,
  runtime,
  userRating,
  title,
  poster,
  imdbID,
  isWatched,
  onClickAdd,
}) => {
  return (
    <section>
      <div className="rating">
        {!isWatched ? (
          <>
            <StarRating
              maxRating={10}
              size={24}
              starColor="gold"
              textColor="gold"
              onSetRating={setUserRating}
            />

            {userRating && (
              <button
                className="btn-add"
                onClick={() =>
                  onClickAdd(
                    imdbRating,
                    runtime,
                    title,
                    poster,
                    imdbID,
                    userRating
                  )
                }
              >
                + Add to Watchlist
              </button>
            )}
          </>
        ) : (
          <p>You have already rated this movie.</p>
        )}
      </div>

      <p>
        <em>{plot !== "N/A" ? plot : ""}</em>
      </p>
      <p>Starring {actors}</p>
      {director === "N/A" ? "" : <p>Director {director}</p>}
    </section>
  );
};

export default MovieDetails;
