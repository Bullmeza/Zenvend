import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLazyQuery } from "@apollo/client";
import { setCookie } from "../data/common";
import { LOGIN } from "../data/queries";

const SignIn = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [handleLogin, { error, data }] = useLazyQuery(LOGIN, {
      variables: { email: email, password: password },
      fetchPolicy: "network-only",
   });

   if (data) {
      setCookie("sessionid", data?.login.sessionid);
      window.location.href = "/";
   }

   const validFromContents = email.length >= 3 && password.length >= 6;

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
               Login
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
                  onClick={() => {
                     handleLogin();
                  }}
                  color={error ? "error" : "primary"}
               >
                  Sign In
               </Button>
               <Grid container>
                  <Grid item xs>
                     <Link href="#" variant="body2">
                        Forgot password?
                     </Link>
                  </Grid>
                  <Grid item>
                     <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                     </Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
   );
};

export default SignIn;
