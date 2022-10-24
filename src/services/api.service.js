import axios from "axios";

export default axios.create({
  baseURL: "https://anime-db.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
    "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
  },
});
