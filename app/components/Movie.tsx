import { css } from "@emotion/react";
import { Children, useState } from "react";
import YouTube from "react-youtube";
import { isAutoPlayEnd } from "../type";

type Props = {
  movieId: string | undefined;
  index: number;
  updateMovieId: (index: number) => void;
  isAutoPlayEnd: isAutoPlayEnd;
};

const classes = {
  wrap: css`
    position: relative;
  `,
  movie: css`
    height: 49vh;
    width: 44.5vw;
  `,
  noMovie: css`
    height: 49vh;
    width: 44.5vw;
    background-color: #fafdff;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const Movie: React.FC<Props> = ({
  movieId,
  children,
  index,
  updateMovieId,
  isAutoPlayEnd,
}) => {
  return (
    <>
      {movieId != "" ? (
        <div css={classes.wrap}>
          {children}
          <YouTube
            videoId={movieId}
            onEnd={() =>
              isAutoPlayEnd["end"] == 1 ? updateMovieId(index) : null
            }
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
      ) : (
        <div css={classes.noMovie}>動画を登録してください。</div>
      )}
    </>
  );
};

export default Movie;
