import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const NavBar = () => {
  const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);
  const isUserAdmin = isAdmin();

  return (
    <div className="navbar bg-base-100">
      {/* App Name */}
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl md:text-2xl lg:text-3xl">
          LibraryMS
        </a>
      </div>

      {/* Conditional Rendering based on login state */}
      {isLoggedIn && (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-sm md:text-base lg:text-lg">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/books">Books</a>
            </li>
            {isUserAdmin && (
              <li>
                <a href="/users">Users</a>
              </li>
            )}
          </ul>

          {/* User Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-sm md:text-base lg:text-lg"
            >
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
