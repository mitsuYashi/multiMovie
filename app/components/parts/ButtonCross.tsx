import { css } from "@emotion/react";
import { IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  updateMovieId: (index: number) => void;
  index: number;
};

const classes = {
  cross: css`
    position: absolute;
    right: 1vw;
    top: 7vh;
    padding: 0;
    width: 40px;
    height: 40px;
    background-color: #ffffff;
    /* border-radius: 50%;
    font-size: 3rem;
    line-height: 0;
    color: #fff;
    text-shadow: #fff 0px 0px 1px;
    border: none;

    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
      transform: rotate(180deg);
    } */
  `,
};

const ButtonCross: React.FC<Props> = ({ updateMovieId, index }) => {
  const handleClick = () => {
    updateMovieId(index);
  };

  return (
    <IconButton css={classes.cross} onClick={handleClick}>
      <CloseIcon />
    </IconButton>
  );
};

export default ButtonCross;
