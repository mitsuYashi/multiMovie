type Props = {
  movieId: string | undefined;
};

const Movie: React.FC<Props> = ({ movieId }) => {
  return (
    <>
      {movieId != "" ? (
        <div style={{ position: "relative" }}>
          <button
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              padding: 0,
              width: "50px",
              height: "50px",
              backgroundColor: "#c4302b",
              borderRadius: "50%",
              fontSize: "3rem",
              lineHeight: 0,
              color: "#fff",
              textShadow: "#fff 0px 0px 1px" 
            }}
          >
            ×
          </button>
          <iframe
            style={{ height: "45vh", width: "45vw" }}
            src={`https://www.youtube.com/embed/${movieId}?enablejsapi=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div
          style={{
            height: "45vh",
            width: "45vw",
            backgroundColor: "#fafdff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          動画を登録してください。
        </div>
      )}
    </>
  );
};

export default Movie;
