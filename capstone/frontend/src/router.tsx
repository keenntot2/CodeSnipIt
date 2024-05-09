import { createBrowserRouter } from "react-router-dom";
import InvalidLanguageError from "./components/InvalidLanguageError";
import InvalidLanguageSnippet from "./components/InvalidLanguageSnippet";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import AddSnippetPage from "./pages/AddSnippetPage";
import ChangeNamePage from "./pages/ChangeNamePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
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
      {
        path: "account",
        element: <AccountSettingsPage />,
        children: [
          { path: "change/name", element: <ChangeNamePage /> },
          { path: "change/password", element: <ChangePasswordPage /> },
        ],
      },
    ],
  },
]);

export default router;
