import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../../data/mutations";
import LoadingView from "../../components/LoadingView";
import LocationRequestView from "../../components/LocationRequestView";

const currencies = [
   {
      value: "C$",
      label: "C$",
   },
   {
      value: "$",
      label: "$",
   },

   {
      value: "€",
      label: "€",
   },

   {
      value: "CN¥",
      label: "CN¥",
   },
   {
      value: "JP¥",
      label: "JP¥",
   },
];

const AddItem = ({ location, userId }) => {
   const [barcode, setBarcode] = useState("");
   const [manualInput, setManualInput] = useState(true);
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState(0);
   const [currency, setCurrency] = useState("C$");
   const [storeName, setStoreName] = useState("");

   const handleBarcode = async () => {};

   const [createProduct, { data, error }] = useMutation(CREATE_PRODUCT, {
      variables: {
         name: name,
         price: price,
         currency: currency,
         description: description,
         image: "https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
         author: userId,
         storeName: storeName,
         location:
            location && !(location instanceof Error)
               ? [location.coords.longitude, location.coords.latitude]
               : [0, 0],
      },
   });

   if (!location) return <LoadingView />;
   if (location instanceof Error) return <LocationRequestView />;

   if (!manualInput) {
      return (
         <Container>
            <CssBaseline />
            <Box>
               <Typography component="h1" variant="h5">
                  Add Item
               </Typography>
               <Box
                  component="form"
                  sx={{ mt: 1, maxWidth: "400px", width: "90%" }}
               >
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     label="Barcode"
                     name="barcode"
                     onChange={(e) => {
                        setBarcode(e.target.value);
                     }}
                  />

                  <Button
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                     onClick={handleBarcode}
                  >
                     Next
                  </Button>
                  <Box display="flex" justifyContent="flex-end">
                     <Link
                        variant="body2"
                        onClick={() => {
                           setManualInput(true);
                        }}
                     >
                        {"Manual Input"}
                     </Link>
                  </Box>
               </Box>
            </Box>
         </Container>
      );
   }

   return (
      <Container>
         <CssBaseline />
         <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
         >
            <Typography variant="h4">Add Item</Typography>
            <Box sx={{ mt: 1, maxWidth: "600px", width: "90%" }}>
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => {
                     setName(e.target.value);
                  }}
               />
               <Box display="flex" flexDirection="row">
                  <TextField
                     margin="normal"
                     id="outlined-select-currency"
                     select
                     label="Currency"
                     value={currency}
                     onChange={(e) => {
                        setCurrency(e.target.value);
                     }}
                     sx={{
                        width: "120px",
                        textAlign: "center",
                        marginRight: "20px",
                     }}
                  >
                     {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                           {option.label}
                        </MenuItem>
                     ))}
                  </TextField>
                  <TextField
                     margin="normal"
                     required
                     label="Price"
                     type="number"
                     fullWidth
                     value={price}
                     onChange={(e) => {
                        setPrice(e.target.value);
                     }}
                  />
               </Box>

               <TextField
                  margin="normal"
                  fullWidth
                  label="Description"
                  multiline
                  rows={2}
                  value={description}
                  onChange={(e) => {
                     setDescription(e.target.value);
                  }}
               />
               <TextField
                  margin="normal"
                  fullWidth
                  required
                  label="Store Name"
                  value={storeName}
                  onChange={(e) => {
                     setStoreName(e.target.value);
                  }}
               />
               <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={createProduct}
                  disabled={(name.length === 0, storeName.length === 0)}
               >
                  Add Item
               </Button>
            </Box>
         </Box>
      </Container>
   );
};

export default AddItem;
