export type isAutoPlayEnd = {
  autoplay: 0 | 1;
  end: 0 | 1;
};

export type User = {
  name: string;
  uid: string;
};

export type firebaseResponse = {
  displayName: string;
  accessToken: string;
};

export type Movie = {
  id: string;
  title: string;
};

export type MovieList = (Movie | undefined)[];

export type ServerMoviesItem = {
  id: number;
  movie_id: string;
  title: string;
};

export type ServerMovies = ServerMoviesItem[];
