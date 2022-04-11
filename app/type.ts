export type isAutoPlayEnd = {
  autoplay: 0 | 1;
  end: 0 | 1;
};

export type user = {
  name: string;
  uid: string;
};

export type firebaseResponse = {
  displayName: string;
  accessToken: string;
};

export type movie = {
  id: string;
  title: string;
};

export type MovieList = (movie | undefined)[];

export type ServerMoviesItem = {
  id: number;
  movie_id: string;
  title: string;
};

export type ServerMovies = ServerMoviesItem[];
