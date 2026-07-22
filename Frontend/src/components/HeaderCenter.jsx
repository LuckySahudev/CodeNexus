import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DashBoard from "./DashBoard";

const HeaderCenter = ({ requireLogin,isHome, setIsHome ,isLogin }) => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Practice", path: "/dev/practice" },
    { name: "Learn DSA", path: "/dev/learndsa" },
    { name: "Progress", path: "/dev/progress" },
    { name: "dashboard", path:"/dev/dashboard"}
  ];

  return (
    <nav className="flex gap-8">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          onClick={(e) => {
            if (link.name !== "Home") {
              requireLogin(e);
            }
          }}
          className={({ isActive }) =>
            `capitalize transition-colors ${
              isActive ? "text-amber-500" : "text-white "
            }
            active:scale-[98%] hover:text-amber-400`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default HeaderCenter;
