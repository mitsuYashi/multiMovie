import { css } from "@emotion/react";
import React from "react";

type Props = {
  updateMovieId: (index: number) => void;
  index: number;
};

const classes = {
  cross: css`
    position: absolute;
    right: 1vw;
    top: 1vh;
    padding: 0;
    width: 50px;
    height: 50px;
    background-color: #c4302b;
    border-radius: 50%;
    font-size: 3rem;
    line-height: 0;
    color: #fff;
    text-shadow: #fff 0px 0px 1px;
    border: none;

    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
      transform: rotate(180deg);
    }
  `,
};

const ButtonCross: React.FC<Props> = ({ updateMovieId, index }) => {
  const handleClick = () => {
    updateMovieId(index);
  };

  return (
    <button css={classes.cross} onClick={handleClick}>
      ×
    </button>
  );
};

export default ButtonCross;
