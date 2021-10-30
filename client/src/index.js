import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
   uri: "http://localhost:3001/query",
   cache: new InMemoryCache(),
});

ReactDOM.render(
   <ApolloProvider client={client}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </ApolloProvider>,
   document.getElementById("root")
);
