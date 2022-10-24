import { Chip } from "@mui/material";
import "./Genres.css";

export default function Genres({ item, onGenreClick }) {
  return (
    <div style={{ padding: "5px" }}>
      {item.selected}
      <Chip
        label={item.name}
        onClick={() => onGenreClick(item)}
        className={item.selected ? "selected" : "unselected"}
      />
    </div>
  );
}
