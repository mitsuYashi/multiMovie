import axios from "axios";
import useSWR from "swr";
import { listenAuthState, userToken } from "./firebase";
import { ServerMovies, User } from "/type";

export const getUserFetcher = async (url: string): Promise<User> => {
  const token = await userToken();
  if (token == undefined) {
    const error = new Error("cannot find Account token");
    throw error;
  } else {
    return axios
      .get(`${process.env.originAPI}/${url}`, {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      })
      .then((res) => res.data);
  }
};

export const getMovieFetcher = async (url: string): Promise<ServerMovies> => {
  const token = await userToken();
  if (token == undefined) {
    const error = new Error("cannot find Account token");
    throw error;
  } else {
    return axios
      .get(`${process.env.originAPI}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  }
};

export const putPlayListFetcher = async (url: string): Promise<void> => {
  const token = await userToken();
  if (token == undefined) {
    const error = new Error("cannot find Account token");
    throw error;
  } else {
    return axios
      .put(
        `${process.env.originAPI}/${url}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await token}`,
          },
        }
      )
      .then((res) => res.data);
  }
};

export const postFetcher = async (url: string, payload: Object) => {
  const token = await userToken();
  if (token == undefined) {
    const error = new Error("cannot find Account token");
    throw error;
  } else {
    return axios
      .post(`${process.env.originAPI}/${url}`, payload, {
        headers: {
          Authorization: `Bearer ${await userToken()}`,
        },
      })
      .then((res) => res.data);
  }
};

export const noLoginFetcher = (url: string) =>
  axios.get(`${process.env.originAPI}/${url}`).then((res) => res.data);
