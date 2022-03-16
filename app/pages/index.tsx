import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import InputUrl from "/components/InputUrl";
import ListMovie from "/components/ListMovie";
import Movie from "/components/Movie";

const Index: NextPage = () => {
  const [movieIds, setMovieIds] = useState<string[]>([]);
  const [displayMovieId, setDisplayMovieId] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);

  useEffect(() => {
    
  }, []);

  const addMovieId = (url: string) => {
    setMovieIds([...movieIds, url]);

    // setDisplayMovieId(
    //   displayMovieId.map((movieId) => (movieId == "" ? url : ""))
    // );

    console.log(url);
  };

  return (
    <div>
      <InputUrl addMovieId={addMovieId} />
      <div style={{display: "flex"}}>
        <ListMovie movieIds={movieIds} />
        <div
          style={{
            height: "90vh",
            width: "100vw",
            display: "grid",
            gridTemplateColumns: "45vw 45vw",
            gridTemplateRows: "45vh 45vh",
          }}
        >
          {movieIds.slice(0, 4).map((movieId, index) => (
            <Movie movieId={movieId} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
