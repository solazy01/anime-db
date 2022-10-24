import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import Search from "../Search/Search";
import Genres from "../Genres/Genres";
import animeDb from "../../services/api.service";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SelectPageFormat from "../Select/SelectPageFormat";

export default function Header({
  onSearch,
  onSelectedGenresChange,
  pageFormat,
}) {
  const [genres, setGenres] = useState([]);

  const getGenre = async () => {
    // API REQUEST to get array of genres (ex. { _id: string })
    const resp = await animeDb.get(`/genre`);
    // transform response to new type => { name: string, selected: boolean}
    const resGenres = resp.data.map((item) => ({
      name: item._id,
      selected: false,
    }));
    // set new transform data to state
    setGenres(resGenres);
  };

  // call api request after component mounted
  useEffect(() => {
    getGenre();
  }, []);

  // change particular genre selected param and update state based on prev state data
  const updateGenre = (clickedItem) => {
    setGenres((prevState) => {
      return prevState.map((item) =>
        // obj = {id: 'id', name: 'name', link: 'link' } =>
        // { ...obj } =>
        // { ...{ id: 'id', name: 'name', link: 'link' } } =>
        // { id: 'id', name: 'name', link: 'link' }
        item.name === clickedItem.name
          ? { ...item, selected: !item.selected }
          : item
      );
    });
  };
  const applyHandler = () => {
    // arr.filter( (arrItem: any) => boolean (ex. arrItem.param (= / < / > / !=) any)) )
    // transform array of object (ex. {name: string, selected: boolean}) into array of string (ex. ['name', 'name2'])
    onSelectedGenresChange(
      genres.filter(({ selected }) => selected).map(({ name }) => name)
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar className="appBar" position="fixed">
        <Toolbar>
          <Typography
            className="title"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            MyAnimeList Ripoff
          </Typography>
          <Search onChange={onSearch} />
        </Toolbar>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            Genres
          </AccordionSummary>
          <AccordionDetails sx={{ display: "flex", flexWrap: "wrap" }}>
            {genres.map((item) => (
              <Genres item={item} onGenreClick={updateGenre} key={item.name} />
            ))}
            <div
              style={{
                flexGrow: 1,
                paddingRight: "25px",
                alignContent: "right",
              }}
            >
              <Button variant="outlined" onClick={applyHandler}>
                Apply
              </Button>
            </div>
          </AccordionDetails>
          <AccordionDetails>
            <SelectPageFormat pageFormat={pageFormat}></SelectPageFormat>
          </AccordionDetails>
        </Accordion>
      </AppBar>
    </Box>
  );
}
