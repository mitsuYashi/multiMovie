import { css } from "@emotion/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ButtonCross from "/components/ButtonCross";
import InputUrl from "/components/InputUrl";
import ListMovie from "/components/ListMovie";
import Movie from "/components/Movie";

const classes = {
  movies: css`
    height: "99vh";
    width: 88vw;
    display: grid;
    grid-template-columns: 44.5vw 44.5vw;
    grid-template-rows: 49vh 49vh;
  `,
  flex: css`
    display: flex;
    max-width: 10vw;
  `,
};

const Index: NextPage = () => {
  const [movieIds, setMovieIds] = useState<string[]>(["", "", "", ""]);

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
        <div>
          <InputUrl addMovieId={addMovieId} />
          <ListMovie movieIds={movieIds} />
        </div>
        <div css={classes.movies}>
          {movieIds.slice(0, 4).map((movieId, index) => (
            <Movie movieId={movieId} key={index}>
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
