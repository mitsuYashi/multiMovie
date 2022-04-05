import {
  Button,
  Dialog,
  DialogContent,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { isAutoPlayEnd, User } from "../type";
import Login from "./Login";

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
      <Button variant="outlined" onClick={handleClick}>
        setting
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {user != null ? <p>{user.name}</p> : <Login />}
        <DialogContent>
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
