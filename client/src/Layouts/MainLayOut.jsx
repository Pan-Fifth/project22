import { Outlet } from "react-router"
import Navbar from "../components/Navbar"

function MainLayOut() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}
export default MainLayOut