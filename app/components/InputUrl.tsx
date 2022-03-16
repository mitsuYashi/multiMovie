import React, { useRef } from "react";

type Props = {
  addMovieId: (url: string) => void;
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
    <form onSubmit={handleSubmit}>
      <input type="url" ref={urlRef} />
    </form>
  );
};

export default InputUrl;
