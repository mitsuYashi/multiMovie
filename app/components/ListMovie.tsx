type Props = {
  movieIds: string[];
};

const ListMovie: React.FC<Props> = ({ movieIds }) => {

  return (
    <div style={{width: "10vw"}}>
      {movieIds.slice(4,).map((id, index) => (
          <p key={index}>{id}</p>
      ))}
    </div>
  );
};

export default ListMovie;
