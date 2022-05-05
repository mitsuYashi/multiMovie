import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import Login from "./parts/Login";
import Logout from "./parts/Logout";
import { ServerMovies, User } from "/type";
import { loginAuth, logoutAuth } from "./firebase";
import { css } from "@emotion/react";

import PersonIcon from "@mui/icons-material/Person";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { useSWRConfig } from "swr";
import { getMovieFetcher, getUserFetcher } from "./fetcher";
import axios from "axios";

type Props = {
  user: User | null;
  playlist: ServerMovies | null;
  userError: any;
  resetMovies: () => void;
  loadMovies: () => void;
};

const classes = {
  name: css`
    padding: 20px 0;
    margin: 0 0 10px 0;
    text-align: center;
    /* background-color: #ffb032; */
    border-radius: 8px;
  `,
  help: css`
    text-align: center;
  `,
};

const Profile: React.FC<Props> = ({
  user,
  playlist,
  userError,
  resetMovies,
  loadMovies,
}) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoutClick = async () => {
    logoutAuth();
    mutate("user", null, {
      optimisticData: await getUserFetcher("user"),
    });
    mutate("playlist", null);
    resetMovies();
  };

  const handleLoginClick = () => {
    setOpen(false);
    loginAuth().then((res) => {
      try {
        axios
          .post(
            `${process.env.originAPI}/registration`,
            {
              registration: {
                name: res.displayName,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${res.accessToken}`,
              },
            }
          )
          .then((res) => res.data);
        mutate("playlist");
        loadMovies();
      } catch (err) {
        console.log(err);
      }
      // console.log(res);
    });
  };

  return (
    <>
      <IconButton onClick={handleClick} color="primary">
        <PersonIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {user != null || userError == null ? (
            <>
              <div css={classes.name}>{user?.name}</div>
              <DialogActions>
                <Logout handleLogoutClick={handleLogoutClick} />
              </DialogActions>
            </>
          ) : (
            <>
              <div css={classes.name}>ログインを行ってください</div>
              <DialogActions>
                <Login handleLoginClick={handleLoginClick} />
                <IconButton>
                  <HelpOutlineIcon />
                </IconButton>
              </DialogActions>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
