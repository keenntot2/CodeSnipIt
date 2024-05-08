import { createBrowserRouter } from "react-router-dom";
import AddSnippetPage from "./pages/AddSnippetPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SnippetPage from "./pages/SnippetPage";
import InvalidLanguageError from "./components/InvalidLanguageError";
import InvalidLanguageSnippet from "./components/InvalidLanguageSnippet";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import ChangeNamePage from "./pages/ChangeNamePage";
import ChangeEmailPage from "./pages/ChangeEmailPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

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
          { path: "change/email", element: <ChangeEmailPage /> },
          { path: "change/password", element: <ChangePasswordPage /> },
        ],
      },
    ],
  },
]);

export default router;
