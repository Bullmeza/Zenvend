import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../data/mutations";
import LoadingView from "../components/LoadingView";
import { setCookie } from "../data/common";

function validateEmail(email) {
   const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}

const SignUp = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [addTodo, { data, loading, error }] = useMutation(CREATE_USER);

   if (loading) return <LoadingView />;

   if (data) {
      setCookie("sessionid", data?.createUser.sessionid);
      window.location.href = "/";
   }

   const validFromContents = validateEmail(email) && password.length >= 6;

   const handleSubmit = () => {
      addTodo({ variables: { email: email, password: password } });
   };

   return (
      <Container
         component="main"
         maxWidth="xs"
         className="center"
         xs={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <CssBaseline />
         <Box
            sx={{
               marginTop: 8,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
            }}
         >
            <Link href="/" style={{ textDecoration: "none", color: "black" }}>
               <Box display="flex" alignItems="center" margin="50px">
                  <img
                     src={process.env.PUBLIC_URL + "/img/logo.svg"}
                     alt="Logo"
                     style={{ height: "100px" }}
                  />
                  <Typography
                     align="center"
                     variant="h1"
                     className="removeLinkStyle"
                  >
                     envend
                  </Typography>
               </Box>
            </Link>

            <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign Up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => {
                     setEmail(e.target.value);
                  }}
               />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                     setPassword(e.target.value);
                  }}
               />
               <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!validFromContents}
                  onClick={handleSubmit}
               >
                  Sign Up
               </Button>
               <Box display="flex" justifyContent="flex-end">
                  <Link href="/login" variant="body2">
                     {"Already have an account? Login"}
                  </Link>
               </Box>
            </Box>
         </Box>
      </Container>
   );
};

export default SignUp;
