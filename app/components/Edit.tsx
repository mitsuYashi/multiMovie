import {
  Button,
  Dialog,
  DialogContent,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { isAutoPlayEnd, User } from "../type";
import Settings from "@mui/icons-material/Settings";
import { css } from "@emotion/react";
import Image from "next/image";

const classes = {
  title: css`
    display: flex;
    justify-content: center;
  `,
};

type Props = {
  isAutoPlayEnd: isAutoPlayEnd;
  setIsAutoPlayEnd: React.Dispatch<React.SetStateAction<isAutoPlayEnd>>;
  user: User | null;
};

const Edit: React.FC<Props> = ({ setIsAutoPlayEnd, isAutoPlayEnd, user }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...isAutoPlayEnd,
      [event.target.name]: event.target.checked == true ? 1 : 0,
    };
    setIsAutoPlayEnd(newState);

    console.log(isAutoPlayEnd);
  };

  useEffect(() => {}, []);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Settings />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div css={classes.title}>
            <Image
              src="/img/logo.svg"
              width="100%"
              height={50}
              css={classes.title}
            />
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isAutoPlayEnd["autoplay"] == 1 ? true : false}
                  onChange={handleChange}
                  name="autoplay"
                />
              }
              label="AutoPlay"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isAutoPlayEnd["end"] == 1 ? true : false}
                  onChange={handleChange}
                  name="end"
                />
              }
              label="EndClose"
            />
          </FormGroup>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Edit;
