import { IconButton, InputBase, Paper, TextField } from "@mui/material";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function Search({ onChange }) {
  const [searchValue, setSearchValue] = useState("");
  const onChangeSearchValue = () => {
    onChange(searchValue);
  };
  const onChangeInput = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 200 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        onChange={onChangeInput}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={onChangeSearchValue}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
