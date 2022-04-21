import { css } from "@emotion/react";

const classes = {
  noMovie: css`
    height: 49.5vh;
    width: 44.5vw;
    background-color: #fafdff;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const DummyMovie = () => {
  return <div css={classes.noMovie}>動画を登録してください。</div>;
};

export default DummyMovie;
