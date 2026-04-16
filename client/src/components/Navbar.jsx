import { NavLink } from "react-router";

function NavBar() {
  return (
    <div className="bg-emerald-800 h-12 px-8 flex justify-center items-center shadow-md">
      <div className="flex gap-6 font-semibold">
        <NavLink to="/" className="hover:text-rose-600">
          Home
        </NavLink>
        <NavLink to="/login" className="hover:text-rose-600">
          Login
        </NavLink>
        <NavLink to="/select-room" className="hover:text-rose-600">
          ChatRoom
        </NavLink>
        <NavLink to="/register" className="hover:text-rose-600">
          Register
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
