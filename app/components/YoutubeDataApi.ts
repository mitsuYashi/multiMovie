import axios from "axios";

const YoutubeDataApi = async (movieId: string) => {
  const endpoint = "https://www.googleapis.com/youtube/v3/videos";
  const req = `${endpoint}?part=snippet&id=${movieId}&key=AIzaSyCavPBkH9wuFdZrpyT3tgSDJ7J82AAy_P0`;
  try {
    const res = await axios.get(req);
    return res.data.items[0].snippet.title;
  } catch (err) {
    console.log(err);
  }
};

export default YoutubeDataApi;
