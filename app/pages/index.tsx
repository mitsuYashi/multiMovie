import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { css } from "@emotion/react";

import ButtonCross from "../components/parts/ButtonCross";
import Edit from "/components/Edit";
import InputUrl from "/components/InputUrl";
import ListMovie from "/components/ListMovie";
import Movie from "/components/Movie";
import { isAutoPlayEnd, movie, MovieList, ServerMovies } from "../type";
import {
  getMovieFetcher,
  getUserFetcher,
  putPlayListFetcher,
} from "/components/fetcher";
import useSWR from "swr";
import DummyMovie from "/components/DummyMovie";

type player = {
  target: React.SetStateAction<player>;
} | null;

const classes = {
  movies: css`
    height: 100vh;
    width: 90vw;
    display: grid;
    grid-template-columns: 45vw 45vw;
    grid-template-rows: 50vh 50vh;
    /* overflow-y: unset; */
  `,
  flex: css`
    display: flex;
  `,
  qu: css`
    width: 10vw;
    height: 100vh;
    padding: 0 10px 10px 10px;
    align-items: stretch;
    flex-direction: column;
    justify-content: space-between;
  `,
  // editButton: css`
  //   position: fixed;
  //   left: 10px;
  //   bottom: 10px;
  // `,
};

const Index: NextPage = () => {
  const { data: playlist, error: playlistError } = useSWR<ServerMovies>(
    "playlist",
    getMovieFetcher
  );
  const { data: user, error: userError } = useSWR<object>(
    "user",
    getUserFetcher
  );

  const [movies, setMovies] = useState<MovieList>([
    // { id: "", title: "" },
    // { id: "", title: "" },
    // { id: "", title: "" },
    // { id: "", title: "" },
  ]);

  const [isAutoPlayEnd, setIsAutoPlayEnd] = useState<isAutoPlayEnd>({
    autoplay: 1,
    end: 1,
  });

  const addMovie = (
    movies: MovieList,
    id: string,
    title: string
  ): MovieList => {
    let replaced = false;
    const tmpMovies = movies.map((movie) => {
      if (replaced || movie != undefined) return movie;
      return { id: id, title: title };
    });

    if (replaced) return tmpMovies;
    return [...movies, { id: id, title: title }];
  };

  const handleSubmit = (id: string, title: string) => {
    setMovies(addMovie(movies, id, title));
  };

  const updateMovies = async (index: number) => {
    let newMovies = movies.map((str, ind) => {
      if (ind == index) {
        return movies[4] ?? undefined;
      } else {
        return str;
      }
    });
    newMovies.splice(4, 1);
    setMovies([...newMovies]);
    if (user) await putPlayListFetcher(`playlist/${movies[index]?.id}`);
  };

  const loadMovies = () => {
    const newMovies = playlist?.reduce(
      (prev, curr) => addMovie(prev, curr.movie_id, curr.title),
      movies
    );
    if (newMovies != undefined) setMovies(newMovies);
  };

  useEffect(() => {
    console.log(playlist);
    loadMovies();
  }, [playlist]);

  // if (playlistError) return <div>failed to load</div>;
  // if (!user || !playlist) return <div>loading…</div>;
  const movieFour = [...Array(4)].map((_, i) => movies[i] ?? undefined);

  return (
    <div css={classes.flex}>
      <div css={[classes.qu, classes.flex]}>
        <div>
          <InputUrl addMovieId={handleSubmit} />
          <ListMovie movies={movies} />
        </div>
        <Edit
          setIsAutoPlayEnd={setIsAutoPlayEnd}
          isAutoPlayEnd={isAutoPlayEnd}
          // css={classes.editButton}
          user={user ?? null}
        />
      </div>
      <div css={classes.movies}>
        {movieFour.map((movie, index) =>
          movie == undefined ? (
            <DummyMovie key={index} />
          ) : (
            <Movie
              movieId={movie?.id}
              key={index}
              index={index}
              updateMovieId={updateMovies}
              isAutoPlayEnd={isAutoPlayEnd}
            >
              <ButtonCross
                key={index}
                index={index}
                updateMovieId={updateMovies}
              />
            </Movie>
          )
        )}
      </div>
    </div>
  );
};

export default Index;
