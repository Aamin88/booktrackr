import "./index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Error from "./routes/error/Error.jsx";
import Home from "./routes/home/Home.jsx";
import Add from "./routes/add/Add.jsx";
import Root from "./routes/root.jsx";
import BookDetailsPage from "./routes/bookDetailPage/BookDetailsPage.jsx";

import { appLoader, mainLoader, addLoader, bookLoader } from "./loaders";
import { homeAction, addAction } from "./actions";

const root = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: mainLoader,
        action: homeAction,
        element: <Home />,
      },
      {
        path: "/books",
        element: <App />,
        loader: appLoader,
      },
      {
        path: "/add",
        element: <Add />,
        loader: addLoader,
        action: addAction,
      },
      {
        path: "/:bookId",
        element: <BookDetailsPage />,
        loader: bookLoader,
      },
      {},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={root} />
    <ToastContainer />
  </React.StrictMode>
);

// navbar

// home page
// form to add a book page
// view book details page, edit through this page, delete, upvote here
