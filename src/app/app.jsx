import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { AppStyle } from "./app-style";
import "./app.css";
import { HomeView } from "../modules";
import LoadingContextProvider from "store2/loading-context-provider";
import { ClerkProvider } from "@clerk/clerk-react";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider theme={AppStyle}>
        <Router>
          <LoadingContextProvider>
            <HomeView />
          </LoadingContextProvider>
        </Router>
      </ThemeProvider>
    </ClerkProvider>
  );
};
