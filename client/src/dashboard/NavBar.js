import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LogoutIcon from "@mui/icons-material/Logout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const NavBar = ({ name, points, onLogout }) => {
   const path = window.location.pathname;
   if (name) {
      return (
         <>
            <Divider />
            <List>
               <ListItem>
                  <ListItemIcon>
                     <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                     primary={name ?? "Name"}
                     primaryTypographyProps={{ noWrap: true }}
                  />
               </ListItem>
               <ListItem>
                  <ListItemIcon>
                     <LoyaltyIcon />
                  </ListItemIcon>
                  <ListItemText primary={points ?? "Points"} />
               </ListItem>
            </List>
            <Divider />

            <List>
               <ListItem
                  button
                  component="a"
                  href="/"
                  selected={path !== "/addItem" ? true : false}
               >
                  <ListItemIcon>
                     <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Shop" />
               </ListItem>
               <ListItem
                  button
                  component="a"
                  href="/addItem"
                  selected={path === "/addItem" ? true : false}
               >
                  <ListItemIcon>
                     <AddShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Item" />
               </ListItem>
               <ListItem button onClick={onLogout}>
                  <ListItemIcon>
                     <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
               </ListItem>
            </List>
         </>
      );
   }

   return (
      <>
         <Divider />
         <List>
            <ListItem button>
               <ListItemIcon>
                  <ShoppingCartIcon />
               </ListItemIcon>
               <ListItemText primary="Shop" />
            </ListItem>
            <ListItem button component="a" href="/login">
               <ListItemIcon>
                  <LogoutIcon />
               </ListItemIcon>
               <ListItemText primary="Login" />
            </ListItem>
         </List>
      </>
   );
};

export default NavBar;
