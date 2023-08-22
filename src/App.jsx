import { useEffect, useRef, useState } from "react";

//  ******** COMPONENTS ********** //
import Loader from "./components/loader";
import Box from "./components/box";
import MoviesList from "./components/movielist";
import Summary from "./components/summary";
import Navbar from "./components/navbar";
import MovieDetails from "./components/movieDetail";
import MoviesWatched from "./components/moviesWatched";
import { useMovies } from "./custom Hooks/useMovies";
import { useLocalStoage } from "./custom Hooks/useLocalStorage";
import { useKeydownKey } from "./custom Hooks/useKey";

export default function App() {
  const [query, setQuery] = useState("shivam");
  // const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const selctedMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? "" : id));
  };

  const handleCloseMovie = () => {
    setSelectedId("");
  };

  function handleDeleteWatch(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function handleAdd(imdbRating, runtime, title, poster, imdbID, userRating) {
    const WatchMovieDetail = {
      imdbID,
      poster,
      title,
      userRating: Number(userRating),
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at([0])),
    };

    const watch = watched.find(
      (watched) => watched.imdbID === WatchMovieDetail.imdbID
    );

    !watch
      ? setWatched((watched) => [...watched, WatchMovieDetail])
      : setWatched(watched);

    //local storage storing 1 type
    // localStorage.setItem(
    //   "watched",
    //   JSON.stringify([...watched, WatchMovieDetail])
    // );

    setSelectedId("");
  }

  const [watched, setWatched] = useLocalStoage([], "watched");

  const { movies, isLoading, errorMessage, setErrorMessage } = useMovies(
    query,
    handleCloseMovie
  );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        {/* <Box element={<MoviesList movies={movies} />} />
        <Box
          element={
            <>
              <Summary watched={watched}>Movies you watched</Summary>
              <MoviesWatched watched={watched} />
            </>
          }
        /> */}
        <Box>
          {isLoading && <Loader> Loading... </Loader>}
          {!isLoading && !errorMessage && (
            <MoviesList movies={movies} onSelectedMovie={selctedMovie} />
          )}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              setErrorMessage={setErrorMessage}
              onClickAdd={handleAdd}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched}>Movies you watched</Summary>

              <MoviesWatched
                watched={watched}
                setWatched={setWatched}
                onDeleteWatch={handleDeleteWatch}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>💥</span> {message}
    </p>
  );
}

function Search({ query, setQuery }) {
  // making search bar focus when enter clicked
  const inputEl = useRef(null);

  useKeydownKey("enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
  });

  // useEffect(() => {
  //   function callBack(e) {
  //     if (e.code === "Enter") {
  //       inputEL.current.focus();
  //     }
  //   }

  //   document.addEventListener("keydown", callBack);
  //   return function () {
  //     document.addEventListener("keydown", callBack);
  //   };
  // }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies ? movies.length : 0}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
