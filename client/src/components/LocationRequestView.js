import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@mui/material";

const LocationRequestView = () => {
   return (
      <Box
         display="flex"
         height="100%"
         justifyContent="center"
         alignItems="center"
         flexDirection="column"
      >
         <CssBaseline />

         <Typography variant="h3" textAlign="center">
            Your location is required
         </Typography>
         <Box sx={{ width: "80%" }} margin={3}>
            <LinearProgress />
         </Box>
         <Typography variant="subtitle1" textAlign="center">
            Please change your location settings
         </Typography>
      </Box>
   );
};

export default LocationRequestView;
