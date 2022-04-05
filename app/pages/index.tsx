import { NextPage } from "next";
import React, { createContext, useEffect, useState } from "react";

import { css } from "@emotion/react";

import ButtonCross from "../components/parts/ButtonCross";
import Edit from "/components/Edit";
import InputUrl from "/components/InputUrl";
import ListMovie from "/components/ListMovie";
import Movie from "/components/Movie";
import { isAutoPlayEnd, movie } from "../type";
import { Button } from "@mui/material";
import { listenAuthState } from "/components/firebase";
import { fetcher } from "/components/fetcher";
import useSWR from "swr";

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
  const { data, error } = useSWR("user", fetcher);
  const [movies, setMovies] = useState<movie[]>([
    { id: "", title: "" },
    { id: "", title: "" },
    { id: "", title: "" },
    { id: "", title: "" },
  ]);

  const [isAutoPlayEnd, setIsAutoPlayEnd] = useState<isAutoPlayEnd>({
    autoplay: 1,
    end: 1,
  });

  const addMovieId = (url: string, title: string) => {
    let flag = true;
    const newMovies = movies.map((str, index) => {
      if (str.id == "" && flag == true) {
        flag = false;
        return { id: url, title: title };
      } else {
        return { id: str.id, title: str.title };
      }
    });
    setMovies(newMovies);
    if (flag) {
      setMovies([...movies, { id: url, title: title }]);
    }
  };

  const updateMovieId = (index: number) => {
    let newMovies = movies.map((str, ind) => {
      if (ind == index) {
        return movies[4] ?? { id: "", title: "" };
      } else {
        return str;
      }
    });
    newMovies.splice(4, 1);
    setMovies([...newMovies]);
  };

  useEffect(() => {}, []);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading…</div>;

  return (
    <div css={classes.flex}>
      <div css={[classes.qu, classes.flex]}>
        <div>
          <InputUrl addMovieId={addMovieId} />
          <ListMovie movies={movies} />
        </div>
        {/* <Button onClick={onPlayVideo}>再生</Button> */}
        <Edit
          setIsAutoPlayEnd={setIsAutoPlayEnd}
          isAutoPlayEnd={isAutoPlayEnd}
          // css={classes.editButton}
          user={data ?? null}
        />
      </div>
      <div css={classes.movies}>
        {movies.slice(0, 4).map((movie, index) => (
          <Movie
            movieId={movie.id}
            key={index}
            index={index}
            updateMovieId={updateMovieId}
            isAutoPlayEnd={isAutoPlayEnd}
            // onReady={onReady}
          >
            <ButtonCross
              key={index}
              index={index}
              updateMovieId={updateMovieId}
            />
          </Movie>
        ))}
      </div>
    </div>
  );
};

export default Index;
