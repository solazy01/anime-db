import { FormControl, MenuItem, Select } from "@mui/material";
import * as React from "react";
import { useState } from "react";

export default function SelectPageFormat({ pageFormat }) {
  const selectChange = (event) => {
    pageFormat(event.target.value);
    setValue(event.target.value);
  };

  const [value, setValue] = useState(10);
  return (
    <FormControl fullWidth sx={{ paddingBottom: "10px" }}>
      <Select
        color="primary"
        id="demo-simple-select"
        value={value}
        size="small"
        onChange={selectChange}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </FormControl>
  );
}
