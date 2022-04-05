import axios from "axios";
import useSWR from "swr";
import { listenAuthState } from "./firebase";
import { User } from "/type";

export const fetcher = (url: string): Promise<User> => {
  return listenAuthState()
    .then((token) => {
      return axios.get(`${process.env.originAPI}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then((res) => res.data);
};

export const noLoginFetcher = (url: string) =>
  axios.get(`${process.env.originAPI}/${url}`).then((res) => res.data);
