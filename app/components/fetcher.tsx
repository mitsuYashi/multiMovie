import axios from "axios";
import useSWR from "swr";
import { listenAuthState, userToken } from "./firebase";
import { ServerMovies, user } from "/type";

export const getUserFetcher = async (url: string): Promise<user> => {
  return axios
    .get(`${process.env.originAPI}/${url}`, {
      headers: {
        Authorization: `Bearer ${await userToken()}`,
      },
    })
    .then((res) => res.data);
};

export const getMovieFetcher = async (url: string): Promise<ServerMovies> => {
  return axios
    .get(`${process.env.originAPI}/${url}`, {
      headers: {
        Authorization: `Bearer ${await userToken()}`,
      },
    })
    .then((res) => res.data);
};

export const putPlayListFetcher = async (url: string): Promise<void> => {
  return axios
    .put(
      `${process.env.originAPI}/${url}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await userToken()}`,
        },
      }
    )
    .then((res) => res.data);
};

export const postFetcher = async (url: string, payload: Object) => {
  return axios
    .post(`${process.env.originAPI}/${url}`, payload, {
      headers: {
        Authorization: `Bearer ${await userToken()}`,
      },
    })
    .then((res) => res.data);
};

export const noLoginFetcher = (url: string) =>
  axios.get(`${process.env.originAPI}/${url}`).then((res) => res.data);
