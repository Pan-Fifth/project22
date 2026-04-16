import { createBrowserRouter } from "react-router";
import ChatBox from "../pages/ChatBox";
import MainLayOut from "../Layouts/MainLayOut";
import HomePage from "../pages/HomePage"
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'login', element: <Login /> },
            { path: 'chat', element: <ChatBox /> },
            { path: 'register', element: <Register /> },
        ]
    }
])

export default router