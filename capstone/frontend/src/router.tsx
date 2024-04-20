import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AddSnippetPage from "./pages/AddSnippetPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
        children: [
          { path: ":languageSlug/add-snippet", element: <AddSnippetPage /> },
        ],
      },
    ],
  },
]);

export default router;
