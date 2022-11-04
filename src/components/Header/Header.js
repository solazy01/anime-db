import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar className="appBar" position="fixed">
        <Toolbar>
          <Link
            className="title"
            variant="h6"
            component="button"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate(`/`);
            }}
            sx={{ color: "white" }}
            underline="none"
          >
            MyAnimeList Ripoff
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
