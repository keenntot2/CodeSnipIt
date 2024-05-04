import { createBrowserRouter } from "react-router-dom";
import AddSnippetPage from "./pages/AddSnippetPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
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
      { path: ":languageSlug", element: <HomePage /> },
      { path: ":languageSlug/add-snippet", element: <AddSnippetPage /> },
      { path: ":languageSlug/:snippetSlug", element: <SnippetPage /> },
    ],
  },
]);

export default router;
