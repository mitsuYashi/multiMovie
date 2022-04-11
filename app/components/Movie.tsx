import { css } from "@emotion/react";
import { Children, useState } from "react";
import YouTube from "react-youtube";
import { isAutoPlayEnd, movie } from "../type";

type Props = {
  movieId: string;
  index: number;
  updateMovieId: (index: number) => void;
  isAutoPlayEnd: isAutoPlayEnd;
  // onReady: (event: { target: React.SetStateAction<null> }) => void;
};

const classes = {
  wrap: css`
    position: relative;
  `,
  movie: css`
    height: 49vh;
    width: 44.5vw;
  `,
};

const Movie: React.FC<Props> = ({
  movieId,
  children,
  index,
  updateMovieId,
  isAutoPlayEnd,
  // onReady,
}) => {
  return (
    <div css={classes.wrap}>
      {children}
      <YouTube
        videoId={movieId}
        onEnd={() => (isAutoPlayEnd["end"] == 1 ? updateMovieId(index) : null)}
        css={classes.movie}
        opts={{ playerVars: { autoplay: isAutoPlayEnd["autoplay"] } }}
      />
      {/* <iframe
            src={`https://www.youtube.com/embed/${movieId}?enablejsapi=1&autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
    </div>
  );
};

export default Movie;
