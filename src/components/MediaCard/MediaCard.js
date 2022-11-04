import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./MediaCard.css";
import { CardActionArea, Chip } from "@mui/material";

export default function MediaCard({ item, onCardClick }) {
  return (
    <Card
      className="cardGrid"
      sx={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
      }}
    >
      <CardActionArea onClick={onCardClick}>
        <CardContent className="cardBackground" sx={{}}>
          <Typography
            className="cardTitle"
            gutterBottom
            variant="h5"
            component="div"
          >
            {item.title}
          </Typography>
          {item.genres.map((genre) => (
            <Chip
              label={genre}
              key={genre}
              variant="filled"
              sx={{
                color: "white",
                backgroundColor: "rgba(1,1,1,0.7)",
              }}
            />
          ))}
          <Typography className="cardContent" variant="body1">
            {item.synopsis?.substring(0, 180) || ""}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
