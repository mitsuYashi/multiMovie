import axios from "axios";

const YoutubeDataApi = async (movieId: string) => {
  const endpoint = "https://www.googleapis.com/youtube/v3/videos";
  const req = `${endpoint}?part=snippet&id=${movieId}&key=${process.env.apiKey}`;
  try {
    const res = await axios.get(req);
    return res.data.items[0].snippet.title;
  } catch (err) {
    console.log(err);
  }
};

export default YoutubeDataApi;
