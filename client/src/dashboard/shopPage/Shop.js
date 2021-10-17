import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Masonry from "react-masonry-css";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Map = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={8} defaultCenter={props.center}>
      {props.isMarkerShown && (
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      )}
    </GoogleMap>
  ))
);

const breakpointColumnsObj = {
  default: 3,
  1700: 2,
  1500: 2,
  1050: 1,
  700: 2,
  525: 1,
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

const ProductCard = ({ title, price, description }) => {
  return (
    <Card variant="outlined">
      <CardHeader
        action={
          <Box display="flex" flexDirection="column">
            <IconButton aria-label="settings" size="small">
              <ReadMoreIcon />
            </IconButton>
            <IconButton aria-label="settings" size="small">
              <LocationOnSharpIcon />
            </IconButton>
          </Box>
        }
        title={
          <Typography variant="subtitle1" color="text.primary">
            {title}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" color="text.primary">
            {price}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image="https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Shop = () => {
  const { width } = useWindowDimensions();
  const isPhone = width < 700;

  return (
    <Grid container height="100%">
      <Grid item xs height="100%" padding="2px" overflow="auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {Array.from(Array(11)).map((_, index) => {
            if (index % 2 == 0 && index % 3 == 0) {
              return (
                <ProductCard
                  title="Object"
                  description="HEHYDAYHHDYA"
                  price="$100"
                />
              );
            }
            return (
              <ProductCard
                title="ObjectObject Object"
                description="HEHYD AYHHDYAYD AYHHDYAYDAYHH DYAYDAYHHDYA YDAYHHDYA"
                price="$10"
              />
            );
          })}
        </Masonry>
        <Box height="60px" />
      </Grid>
      {!isPhone && (
        <Grid item xs height="100%" padding="2px">
          <Map
            isMarkerShown
            googleMapURL={process.env.GOOGLE_MAPS_URL}
            loadingElement={<div style={{ height: `100%` }}> Loading</div>}
            containerElement={<Box style={{ height: `100%` }} />}
            mapElement={<Box style={{ height: `100%` }} />}
            center={{ lat: -34.397, lng: 150.644 }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Shop;
