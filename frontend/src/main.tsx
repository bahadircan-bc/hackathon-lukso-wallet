import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SignUp from "./pages/SignUp.tsx";
import Profile from "./pages/Profile.tsx"
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />} />,
    <Route path="/signup" element={<SignUp />} />,
    <Route path="/profile" element={<Profile />} />,

  ])
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);