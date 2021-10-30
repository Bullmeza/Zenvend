import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

const LoadingView = () => {
   return (
      <Box
         display="flex"
         height="100%"
         justifyContent="center"
         alignItems="center"
      >
         <CssBaseline />
         <CircularProgress size={200} thickness={3} />
      </Box>
   );
};

export default LoadingView;
