import { useState, useEffect } from "react";

const key = "c4afdb74";

export function useMovies(query, callBack) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchCall = async () => {
      try {
        callBack?.(); //handleCloseMovies

        setIsLoading(true);
        setErrorMessage("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );

        // fetching ke time agr offline chle gya to..
        if (!res.ok)
          throw new Error(
            "Something went wrong!! with movie fetching, try to restart the app. "
          );
        const data = await res.json();
        if (data.Response === "False") throw new Error("No movies found");
        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          setErrorMessage(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setErrorMessage("");
      return;
    }

    // handleCloseMovie();
    fetchCall();

    // cleanup fetcing for previous
    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, errorMessage, setErrorMessage };
}
