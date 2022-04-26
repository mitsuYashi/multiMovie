import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { css } from "@emotion/react";

import ButtonCross from "../components/parts/ButtonCross";
import Edit from "/components/Edit";
import InputUrl from "/components/InputUrl";
import ListMovie from "/components/ListMovie";
import Movie from "/components/Movie";
import {
  getMovieFetcher,
  getUserFetcher,
  putPlayListFetcher,
} from "/components/fetcher";
import { isAutoPlayEnd, MovieList, ServerMovies, User } from "../type";
import DummyMovie from "/components/DummyMovie";
import Profile from "/components/Profile";

import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Hidden,
} from "@mui/material";
import Image from "next/image";

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
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  `,
  grid: css`
    display: grid;
  `,
  historyMovie: css`
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 3px;
  `,
};

const Index: NextPage = () => {
  const { data: playlist, error: playlistError } =
    useSWRImmutable<ServerMovies>("playlist", getMovieFetcher);
  const { data: user, error: userError } = useSWR<User>("user", getUserFetcher);

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

  const [histryOpen, setHistryOpen] = useState(false);

  const addMovie = (
    movies: MovieList,
    id: string,
    title: string
  ): MovieList => {
    let replaced = false;
    const tmpMovies = movies.map((movie) => {
      if (!replaced && movie == undefined) {
        replaced = true;
        return { id: id, title: title };
      } else return movie;
    });

    console.log(replaced);
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
    if (playlist) setHistryOpen(true);
  };

  const resetMovies = () => {
    setMovies([]);
  };

  useEffect(() => {
    loadMovies();
  }, [playlist]);

  useEffect(() => {
    // console.log(playlist);
  });

  const movieFour = [...Array(4)].map((_, i) => movies[i] ?? undefined);

  const HistoryCheck = () => (
    <Dialog open={histryOpen}>
      <DialogContent>
        <DialogContentText>
          履歴が存在します。読み込みますか？
        </DialogContentText>
        <div css={[classes.grid, classes.historyMovie]}>
          {playlist?.map((data) => (
            <>
              <div>
                <p
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "135px",
                    height: "1rem",
                    lineHeight: 1.0,
                    textOverflow: "ellipsis",
                  }}
                >
                  {data.title}
                </p>
                <Image
                  src={`https://i.ytimg.com/vi/${data?.movie_id}/sddefault.jpg`}
                  width={160}
                  height={120}
                />
              </div>
            </>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setHistryOpen(false);
          }}
          color="error"
        >
          いいえ
        </Button>
        <Button
          onClick={() => {
            setHistryOpen(false);
            const newMovies = playlist?.reduce(
              (prev, curr) => addMovie(prev, curr.movie_id, curr.title),
              movies
            );
            if (newMovies != undefined) setMovies(newMovies);
          }}
        >
          読み込む
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div css={classes.flex}>
      <div css={[classes.qu, classes.flex]}>
        <div>
          <InputUrl addMovie={handleSubmit} />
          <ListMovie movies={movies} />
        </div>
        <div css={classes.flex}>
          <Profile
            user={user ?? null}
            playlist={playlist ?? null}
            userError={userError}
            resetMovies={resetMovies}
            loadMovies={loadMovies}
          />
          <Edit
            setIsAutoPlayEnd={setIsAutoPlayEnd}
            isAutoPlayEnd={isAutoPlayEnd}
            // css={classes.editButton}
            user={user ?? null}
          />
        </div>
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
      <HistoryCheck />
    </div>
  );
};

export default Index;
