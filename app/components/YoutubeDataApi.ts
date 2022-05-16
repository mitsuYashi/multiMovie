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

export const YoutubeDataApiPlaylistItem = async (playlistId: string) => {
  const endpoint = "https://www.googleapis.com/youtube/v3/playlistItems";
  const req = `${endpoint}?playlistId=${playlistId}&part=snippet&key=${process.env.apiKey}`;
  try {
    const res = await axios.get(req);
    return res.data.items.map(
      (data: {
        snippet: { title: string; thumbnails: { default: { url: string } } };
      }) => {
        return [
          data.snippet.title,
          data.snippet.thumbnails.default.url.slice(23, 34),
        ];
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export default YoutubeDataApi;
