import { createBrowserRouter } from "react-router-dom";
import AddSnippetPage from "./pages/AddSnippetPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SnippetPage from "./pages/SnippetPage";
import InvalidLanguageError from "./utils/InvalidLanguageError";
import InvalidLanguageSnippet from "./utils/InvalidLanguageSnippet";

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
      {
        path: ":languageSlug",
        element: <HomePage />,
        errorElement: <InvalidLanguageError />,
      },
      {
        path: ":languageSlug/add-snippet",
        element: <AddSnippetPage />,
        errorElement: <InvalidLanguageError />,
      },
      {
        path: ":languageSlug/:snippetSlug",
        element: <SnippetPage />,
        errorElement: <InvalidLanguageSnippet />,
      },
    ],
  },
]);

export default router;
