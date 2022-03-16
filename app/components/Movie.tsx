import { css } from "@emotion/react";
import { Children } from "react";

type Props = {
  movieId: string | undefined;
};

const classes = {
  wrap: css`
    position: relative;
  `,
};

const Movie: React.FC<Props> = ({ movieId, children }) => {
  return (
    <>
      {movieId != "" ? (
        <div css={classes.wrap}>
          {children}
          <iframe
            style={{ height: "49vh", width: "44.5vw" }}
            src={`https://www.youtube.com/embed/${movieId}?enablejsapi=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div
          style={{
            height: "45vh",
            width: "45vw",
            backgroundColor: "#fafdff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          動画を登録してください。
        </div>
      )}
    </>
  );
};

export default Movie;
