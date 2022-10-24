import * as React from "react";
import {
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import MediaCard from "../MediaCard/MediaCard";
import animeDb from "../../services/api.service";
import "./Main.css";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

// TODO:
// 1) Add select to change request limit of items (10, 25, 50, 100)
// 2) Move Filter to BackEnd as API request
//    - add button 'search'
//    - add button 'apply'
// 3) Add card details page
//    - create UX to display all item params

const Main = ({ search, selectedGenres, pageFMT }) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const getAll = async (page, size, search, genres) => {
    setLoading(true);

    const searchParam = search.length ? `&search=${search}` : "";
    const genresParam = genres.length ? `&genres=${genres.join(", ")}` : "";
    const url = `/anime?page=${page}&size=${size}${searchParam}${genresParam}&sortBy=ranking&sortOrder=asc`;

    const resp = await animeDb.get(url);

    setData(resp.data.data);
    setLoading(false);
  };

  // const getFiltered = async (page, size, search, genres) => {
  //   setLoading({ loading: true });
  //   const resp = await animeDb.get(
  //     `/anime?page=${page}&size=${size}&search=${search}&genres=${genres}&sortBy=ranking&sortOrder=asc`
  //   );
  //   setData(resp.data.data);
  //   setLoading({ loading: false });
  // };

  // useEffect(() => {
  //   getAll(paginator.page, paginator.size, search, selectedGenres);
  // }, []);

  useEffect(() => {
    getAll(1, pageFMT, search, selectedGenres);
  }, [search, selectedGenres, pageFMT]);

  // useEffect(() => {
  //   search.length && selectedGenres.length
  //     ? getFiltered(paginator.page, paginator.size, search, selectedGenres)
  //     : getAll(paginator.page, paginator.size);
  // }, [search, selectedGenres]);

  // useEffect(() => {
  //   getAll(paginator.page, paginator.size);
  // }, [paginator]);

  // const filterBySearch = (filteredItem, searchStr) => {
  //   if (!searchStr.length) return true;
  //   return filteredItem.title.includes(searchStr);
  // };
  //
  // const filterByGenres = (filteredItem, activeGenres) => {
  //   if (!activeGenres.length) return true;
  //   // func = (item) => boolean
  //   // (arr.every(func) / arr.some(func)) => boolean
  //   // [true, true, true, false].every((item) => item === true) => false
  //   // [false, false, true, false].some((item) => item === true) => true
  //
  //   // activeGenres        = [                  'port',          'link']
  //   // filteredItem.genres = ['source', 'dest', 'port', 'cover', 'link']
  //   return activeGenres.every((activeGenre) =>
  //     filteredItem.genres.includes(activeGenre)
  //   );
  // };

  // const handleSelectChange = (event) => {
  //   setPaginator({ page: 1, size: pageFormat });
  // };

  return (
    <main>
      {/*<FormControl fullWidth sx={{ paddingBottom: "10px" }}>*/}
      {/*  <Select*/}
      {/*    color="error"*/}
      {/*    id="demo-simple-select"*/}
      {/*    value={paginator.size}*/}
      {/*    onChange={handleSelectChange}*/}
      {/*  >*/}
      {/*    <MenuItem value={10}>10</MenuItem>*/}
      {/*    <MenuItem value={25}>25</MenuItem>*/}
      {/*    <MenuItem value={50}>50</MenuItem>*/}
      {/*    <MenuItem value={100}>100</MenuItem>*/}
      {/*  </Select>*/}
      {/*</FormControl>*/}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={120} />
        </Box>
      ) : (
        <Grid className="grid" container spacing={2}>
          {data
            // .filter((item) => filterBySearch(item, search))
            // .filter((item) => filterByGenres(item, selectedGenres))
            .map((item) => (
              <Grid item xs={3} key={item._id}>
                <MediaCard item={item} />
              </Grid>
            ))}
        </Grid>
      )}
    </main>
  );
};

export default Main;
