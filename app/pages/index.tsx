import { NextPage } from "next";
import React, { createContext, useEffect, useState } from "react";

import { css } from "@emotion/react";

import ButtonCross from "../components/parts/ButtonCross";
import Edit from "/components/Edit";
import InputUrl from "/components/InputUrl";
import ListMovie from "/components/ListMovie";
import Movie from "/components/Movie";
import { isAutoPlayEnd } from "../type";
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

  const [movieIds, setMovieIds] = useState<string[]>(["", "", "", ""]);

  const [isAutoPlayEnd, setIsAutoPlayEnd] = useState<isAutoPlayEnd>({
    autoplay: 1,
    end: 1,
  });

  const addMovieId = (url: string) => {
    let flag = true;
    const newMovieIds = movieIds.map((str, index) => {
      if (str == "" && flag == true) {
        flag = false;
        return url;
      } else {
        return str;
      }
    });
    setMovieIds(newMovieIds);
    if (flag) {
      setMovieIds([...movieIds, url]);
    }
  };

  const updateMovieId = (index: number) => {
    let newMovieIds = movieIds.map((str, ind) => {
      if (ind == index) {
        return movieIds[4] ?? "";
      } else {
        return str;
      }
    });
    newMovieIds.splice(4, 1);
    setMovieIds([...newMovieIds]);
  };

  useEffect(() => {
    console.log(data);
  }, []);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading…</div>;

  return (
    <div css={classes.flex}>
      <div css={[classes.qu, classes.flex]}>
        <div>
          <InputUrl addMovieId={addMovieId} />
          <ListMovie movieIds={movieIds} />
        </div>
        {/* <Button onClick={onPlayVideo}>再生</Button> */}
        <Edit
          setIsAutoPlayEnd={setIsAutoPlayEnd}
          isAutoPlayEnd={isAutoPlayEnd}
          // css={classes.editButton}
          user={data}
        />
      </div>
      <div css={classes.movies}>
        {movieIds.slice(0, 4).map((movieId, index) => (
          <Movie
            movieId={movieId}
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
