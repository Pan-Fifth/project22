import { createBrowserRouter } from "react-router";
import ChatBox from "../pages/ChatBox";
import MainLayOut from "../Layouts/MainLayOut";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Rooms from "../pages/Rooms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "chat/:room", element: <ChatBox /> },
      { path: "register", element: <Register /> },
      { path: "select-room", element: <Rooms /> },
    ],
  },
]);

export default router;
