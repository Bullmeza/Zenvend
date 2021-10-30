import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Navbar from "./NavBar";
import Shop from "./shopPage/Shop";
import { Route, Switch } from "react-router-dom";
import AddItem from "./addItem/AddItem";
import { getLocation, setCookie } from "../data/common";

function DashboardContent({ email, points, userId }) {
   const [open, setOpen] = useState(false);
   const [location, setLocation] = useState();

   useEffect(() => {
      async function run() {
         try {
            setLocation(await getLocation());
         } catch (err) {
            setLocation(new Error("Location not given"));
         }
      }
      run();
   }, []);

   return (
      <Box display="flex" height="100vh" overflow="hidden">
         <CssBaseline />
         <AppBar position="absolute" open={open}>
            <Toolbar
               sx={{
                  pr: "24px",
               }}
            >
               <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => {
                     setOpen(!open);
                  }}
                  sx={{
                     marginRight: "36px",
                     ...(open && { display: "none" }),
                  }}
               >
                  <MenuIcon />
               </IconButton>
               <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1 }}
               >
                  Dashboard
               </Typography>
               <IconButton style={{ backgroundColor: "transparent" }}>
                  <img
                     src={process.env.PUBLIC_URL + "/img/logo.svg"}
                     alt="Logo"
                     style={{ height: "30px" }}
                  />
               </IconButton>
            </Toolbar>
         </AppBar>
         <Drawer variant="permanent" open={open}>
            <Toolbar
               sx={{
                  display: "flex",
                  alignItems: "center",
                  px: [1],
                  justifyContent: "space-between",
               }}
            >
               <Box marginLeft="15px">
                  <Typography variant="h6">Zenvend</Typography>
               </Box>

               <IconButton
                  onClick={() => {
                     setOpen(!open);
                  }}
                  float="right"
               >
                  <ChevronLeftIcon />
               </IconButton>
            </Toolbar>
            <Navbar
               name={email}
               points={points}
               onLogout={() => {
                  setCookie("sessionid", "");
                  window.location.href = "/";
               }}
            />
         </Drawer>
         <Box
            component="main"
            flexGrow={1}
            display="flex"
            bgcolor="#e2e1e1"
            flexDirection="column"
         >
            <Toolbar />
            <Box
               height="100%"
               display="flex"
               alignItems="center"
               justifyContent="center"
            >
               <Switch>
                  <Route path="/addItem">
                     <AddItem location={location} userId={userId} />
                  </Route>
                  <Route>
                     <Shop location={location} />
                  </Route>
               </Switch>
            </Box>
         </Box>
      </Box>
   );
}

const Dashboard = ({ email, points, userId }) => {
   return <DashboardContent email={email} points={points} userId={userId} />;
};

//STYLE

const drawerWidth = 270;

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}));

const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
   "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
         overflowX: "hidden",
         transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
         width: theme.spacing(7),
         [theme.breakpoints.up("sm")]: {
            width: theme.spacing(7),
         },
      }),
   },
}));

export default Dashboard;
