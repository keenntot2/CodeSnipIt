import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

export default router;
