import { css } from "@emotion/react";
import { TextField } from "@mui/material";
import axios from "axios";
import React, { useRef } from "react";
import { postFetcher } from "./fetcher";
import YoutubeDataApi from "./YoutubeDataApi";
import { MovieList } from "/type";

type Props = {
  addMovie: (id: string, title: string) => void;
};

const classes = {
  youtubeUrl: css``,
};

const InputUrl: React.FC<Props> = ({ addMovie }) => {
  const urlRef = useRef<HTMLInputElement>(null);

  const getTitle = async (videoId: string) => {
    let res = null;
    try {
      res = await axios
        .get(`${process.env.originAPI}/movie/${videoId}`)
        .then((res) => res.data ?? null);
      if (res === null) {
        const title = await YoutubeDataApi(videoId);
        res = await axios
          .post(`${process.env.originAPI}/movie`, {
            movie: {
              uid: videoId,
              title: title,
            },
          })
          .then((res) => res.data);
      }
    } catch (err) {
      console.log(err);
    }

    return res.title;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const url = urlRef.current?.value;
    if (url != null) {
      const urlNum = url.indexOf("?v=");
      if (urlNum != -1) {
        const videoId = url.substring(urlNum + 3, urlNum + 3 + 11);
        const title = await getTitle(videoId);
        console.log(title);
        addMovie(videoId, title);

        await postFetcher("playlist", {
          playlist: {
            movie_id: videoId,
          },
        });
      }
    }
    urlRef.current!.value = "";
  };

  return (
    <form onSubmit={handleSubmit} css={classes.youtubeUrl}>
      {/* <input type="url" ref={urlRef} pattern="https://www.youtube.com/\S+" placeholder="Youtube URL" css={classes.youtubeUrl} /> */}
      <TextField
        label="YouTube URL"
        variant="standard"
        inputRef={urlRef}
        autoComplete="off"
        size="small"
        margin="normal"
      />
    </form>
  );
};

export default InputUrl;
