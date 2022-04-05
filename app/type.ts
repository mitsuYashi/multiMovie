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
