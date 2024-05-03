import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AddSnippetPage from "./pages/AddSnippetPage";
import SnippetPage from "./pages/SnippetPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      { path: ":languageSlug/add-snippet", element: <AddSnippetPage /> },
      { path: ":languageSlug/:snippetSlug", element: <SnippetPage /> },
    ],
  },
]);

export default router;
