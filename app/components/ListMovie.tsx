import { css } from "@emotion/react";
import Image from "next/image";
import { useState } from "react";
import { MovieList } from "/type";
type Props = {
  movies: MovieList;
};

const classes = {
  list: css`
    width: calc(10vw - 10px);

    height: calc(100vh - 69px - 56px);
    overflow-y: auto;
    overflow-x: hidden;
  `,
  image: css`
    margin: 10px 0;
    padding: 10px 0 0 0;
    background-color: #fafdff;
    width: calc(10vw - 20px - 5px);
    height: auto;
    object-fit: contain;
    /* border-bottom: 1px solid #fafdff; */
  `,
};

const ListMovie: React.FC<Props> = ({ movies }) => {
  const [isHover, setIsHover] = useState<boolean[]>([]);
  // let isHover: boolean[] = [];

  const onMouseEnter = (index: number) => {
    const newIsHover = isHover.map((data, ind) => {
      return ind == ind ? false : true;
    });
    setIsHover(newIsHover);
  };

  return (
    <div css={classes.list} className={"scrollBar"}>
      {movies.slice(4).map((arr, index) => (
        <div
          css={classes.image}
          key={index}
          // onMouseEnter={onMouseEnter(index)}
        >
          {arr?.title.slice(0, 15) + "..."}
          <Image
            src={`https://i.ytimg.com/vi/${arr?.id}/sddefault.jpg`}
            width={640}
            height={480}
          />
        </div>
      ))}
    </div>
  );
};

export default ListMovie;
