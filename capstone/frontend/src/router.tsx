import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

export default router;
