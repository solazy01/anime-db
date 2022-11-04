import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import animeDb from "../../services/api.service";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  CircularProgress,
} from "@mui/material";
import * as React from "react";

const Details = () => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const getDetails = async () => {
    setLoading(true);
    const resp = await animeDb.get(`anime/by-id/${params.id}`);
    setDetails(resp.data);
    setLoading(false);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      {loading ? (
        <Box
          sx={{
            paddingTop: "40vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={120} />
        </Box>
      ) : (
        <div
          style={{
            paddingTop: "70px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <Typography variant="h4">{details.title}</Typography>
          <div style={{ display: "flex" }}>
            <div style={{ position: "static" }}>
              <Box
                component="img"
                src={details.image}
                sx={{ padding: "0 10px 10px 0px" }}
              ></Box>
            </div>
            <div style={{ flexDirection: "column", paddingLeft: "10px" }}>
              <div>
                <Accordion>
                  <AccordionSummary>
                    <Typography>Alternative Titles</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {details.alternativeTitles?.map((item) => (
                      <Typography key={item}>{item}</Typography>
                    )) || ""}
                  </AccordionDetails>
                </Accordion>
              </div>
              <Typography variant="h6">Episodes: {details.episodes}</Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ marginRight: "10px" }}>Genres: </Typography>
                {details.genres?.map((genre) => (
                  <Chip title={genre} label={genre} key={genre} />
                )) || ""}
              </div>
              <Typography>Status: {details.status}</Typography>
            </div>
          </div>
          <div>
            <Typography variant="body1">{details.synopsis}</Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
