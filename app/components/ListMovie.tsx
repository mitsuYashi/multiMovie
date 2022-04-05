import { css } from "@emotion/react";
import Image from "next/image";
import { movie } from "/type";
type Props = {
  movies: movie[];
};

const classes = {
  list: css`
    width: calc(10vw - 10px);

    /* height: calc(100vh - 69px - 56px); */
    overflow-y: auto;
    overflow-x: hidden;
  `,
  image: css`
    width: calc(10vw - 20px - 5px);
    height: auto;
    object-fit: contain;
  `,
};

const ListMovie: React.FC<Props> = ({ movies }) => {
  return (
    <div css={classes.list} className={"scrollBar"}>
      {movies.slice(4).map((arr, index) => (
        <div css={classes.image} key={index}>
          {arr.title}
          <Image
            src={`https://i.ytimg.com/vi/${arr.id}/sddefault.jpg`}
            width={640}
            height={480}
          />
        </div>
      ))}
    </div>
  );
};

export default ListMovie;
