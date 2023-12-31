import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SignUp from "./pages/SignUp.tsx";
import Main from "./pages/main.tsx"
import SetData_candas from "./pages/SetData_candas.tsx";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignUpFinal from "./pages/SignUpFinal.tsx";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />} />,
    // <Route path="/signup" element={<SignUp />} />,
    <Route path="/signup" element={<SignUpFinal />} />,
    // <Route path="/setdata" element={<SetData_candas />} />,
    <Route path="/main" element={<Main />} />

  ])
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);