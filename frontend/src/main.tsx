import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SignUp from "./pages/signup.tsx";
import Main from "./pages/main.tsx"
import SetData_candas from "./pages/SetData_candas.tsx";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignUpBahadir from "./pages/SignUp_bahadir.tsx";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />} />,
    <Route path="/signup" element={<SignUp />} />,
    <Route path="/signup_bahadir" element={<SignUpBahadir />} />,
    <Route path="/setdata" element={<SetData_candas />} />,
    <Route path="/main" element={<Main />} />

  ])
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <RouterProvider router={router}/>
  // </React.StrictMode>
);