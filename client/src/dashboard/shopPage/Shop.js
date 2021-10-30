import React from "react";
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
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_LOCATION } from "../../data/queries";
import LoadingView from "../../components/LoadingView";
import { useWindowDimensions } from "../../data/common";

const breakpointColumnsObj = {
   default: 3,
   1700: 2,
   1500: 2,
   1050: 1,
   700: 2,
   525: 1,
};

const Map = withScriptjs(
   withGoogleMap((props) => (
      <GoogleMap defaultZoom={props.zoom} defaultCenter={props.center}>
         {props.markers.map((coordinates, index) => (
            <Marker
               key={`Marker${index}`}
               position={{
                  lat: coordinates[1],
                  lng: coordinates[0],
               }}
            />
         ))}
      </GoogleMap>
   ))
);

const ProductCard = ({ title, price, description, image }) => {
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
         <CardMedia component="img" height="194" image={image} />
         <CardContent>
            <Typography variant="body2" color="text.secondary">
               {description}
            </Typography>
         </CardContent>
      </Card>
   );
};

const Shop = ({ location }) => {
   const { width } = useWindowDimensions();
   const isPhone = width < 700;

   const { data, loading, error } = useQuery(GET_PRODUCTS_BY_LOCATION, {
      variables: {
         location:
            location && !(location instanceof Error)
               ? [location.coords.longitude, location.coords.latitude]
               : [0, 0],
         radius: location && !(location instanceof Error) ? 1000 : 10000000000,
      },
   });

   if (loading || error) return <LoadingView />;

   return (
      <Grid container height="100%">
         <Grid item xs height="100%" padding="2px" overflow="auto">
            <Masonry
               breakpointCols={breakpointColumnsObj}
               className="my-masonry-grid"
               columnClassName="my-masonry-grid_column"
            >
               {data.getProductsByLocation.map((product, index) => {
                  return (
                     <ProductCard
                        key={`ProductCard${index}`}
                        title={product.name}
                        description={product.description}
                        price={`${product.price.currency} ${product.price.value}`}
                     />
                  );
               })}
            </Masonry>
            <Box height="100px" />
         </Grid>
         {!isPhone && (
            <Grid item xs height="100%" padding="2px">
               <Map
                  googleMapURL={process.env.REACT_APP_GOOGLE_MAPS_URL}
                  loadingElement={<LoadingView />}
                  containerElement={<Box style={{ height: `100%` }} />}
                  mapElement={<Box style={{ height: `100%` }} />}
                  center={
                     location && !(location instanceof Error)
                        ? {
                             lat: location.coords.latitude,
                             lng: location.coords.longitude,
                          }
                        : { lat: 14.5994, lng: -28.6731 }
                  }
                  markers={data.getProductsByLocation.map(
                     (product) => product.location.coordinates
                  )}
                  zoom={location && !(location instanceof Error) ? 8 : 2.2}
               />
            </Grid>
         )}
      </Grid>
   );
};

export default Shop;
