import { css } from "@emotion/react";
import { TextField } from "@mui/material";
import React, { useRef } from "react";

type Props = {
  addMovieId: (url: string) => void;
};

const classes = {
  youtubeUrl: css``,
};

const InputUrl: React.FC<Props> = ({ addMovieId }) => {
  const urlRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const url = urlRef.current?.value;
    if (url != null) {
      const urlNum = url.indexOf("?v=");
      const videoId = url.substring(urlNum + 3, urlNum + 3 + 11);
      addMovieId(videoId);
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
