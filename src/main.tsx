import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./pages/Home";
import "./reset.css";
import "./typography.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Settings } from "./Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
