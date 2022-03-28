import { NextPage } from "next";
import React, { createContext, useEffect, useState } from "react";

import { css } from "@emotion/react";

import ButtonCross from "../components/parts/ButtonCross";
import Edit from "/components/Edit";
import InputUrl from "/components/InputUrl";
import ListMovie from "/components/ListMovie";
import Movie from "/components/Movie";
import { isAutoPlayEnd } from "../type";

const classes = {
  movies: css`
    height: "100vh";
    width: 90vw;
    display: grid;
    grid-template-columns: 45vw 45vw;
    grid-template-rows: 50vh 50vh;
  `,
  flex: css`
    display: flex;
  `,
  qu: css`
    padding: 0 10px 10px 10px;
    max-width: 10vw;
    align-items: stretch;
    flex-direction: column;
    justify-content: space-between;
  `,
};

const Index: NextPage = () => {
  const [movieIds, setMovieIds] = useState<string[]>(["", "", "", ""]);

  const [isAutoPlayEnd, setIsAutoPlayEnd] = useState<isAutoPlayEnd>({
    autoplay: 1,
    end: 1,
  });

  const autoPlayEndContext = createContext({ isAutoPlayEnd, setIsAutoPlayEnd });

  useEffect(() => {}, []);

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

    console.log(url);
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

  return (
    <div>
      {console.log(movieIds)}
      <div css={classes.flex}>
        <div css={[classes.qu, classes.flex]}>
          <div>
            <InputUrl addMovieId={addMovieId} />
            <ListMovie movieIds={movieIds} />
          </div>
          <Edit
            setIsAutoPlayEnd={setIsAutoPlayEnd}
            isAutoPlayEnd={isAutoPlayEnd}
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
    </div>
  );
};

export default Index;
