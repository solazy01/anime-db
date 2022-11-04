import * as React from "react";
import { CircularProgress, Grid } from "@mui/material";
import MediaCard from "../MediaCard/MediaCard";
import animeDb from "../../services/api.service";
import "./Main.css";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import Genres from "../Genres/Genres";
import SelectPageFormat from "../Select/SelectPageFormat";

const Main = () => {
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [pageFormat, setPageFormat] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGenre = async () => {
    const resp = await animeDb.get(`/genre`);
    const resGenres = resp.data.map((item) => ({
      name: item._id,
      selected: false,
    }));
    setGenres(resGenres);
  };
  useEffect(() => {
    getGenre();
  }, []);

  const updateGenre = (clickedItem) => {
    setGenres((prevState) => {
      return prevState.map((item) => {
        return item.name === clickedItem.name
          ? { ...item, selected: !item.selected }
          : item;
      });
    });
  };

  const navigate = useNavigate();

  const getAll = async (page, size, search, genres) => {
    setLoading(true);

    const searchParam = search.length ? `&search=${search}` : "";
    const genresParam = genres.length ? `&genres=${genres.join(", ")}` : "";
    const url = `/anime?page=${page}&size=${size}${searchParam}${genresParam}&sortBy=ranking&sortOrder=asc`;

    const resp = await animeDb.get(url);

    setData(resp.data.data);
    setLoading(false);
  };

  useEffect(() => {
    const selected = genres
      .filter(({ selected }) => selected)
      .map(({ name }) => name);

    getAll(1, pageFormat, search, selected);
  }, [search, genres, pageFormat]);

  return (
    <main>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexWrap: "wrap", width: "70vw" }}>
          {genres.map((item) => (
            <Genres item={item} onGenreClick={updateGenre} key={item.name} />
          ))}
        </div>
        <div style={{ paddingTop: "10px", width: "10vw" }}>
          <SelectPageFormat
            pageFormat={(format) => {
              setPageFormat(format);
            }}
          ></SelectPageFormat>
        </div>
        <div style={{ padding: "5px", height: "80px", width: "20vw" }}>
          <Search
            onChange={(search) => {
              setSearch(search);
            }}
          ></Search>
        </div>
      </div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30vh",
          }}
        >
          <CircularProgress size={120} />
        </Box>
      ) : (
        <div>
          <Grid className="grid" container spacing={2} columns="10">
            {data.map((item) => (
              <Grid item xs={2} key={item._id}>
                <MediaCard
                  item={item}
                  onCardClick={() => {
                    navigate(`/${item._id}/details`, { name: item._id });
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </main>
  );
};

export default Main;
