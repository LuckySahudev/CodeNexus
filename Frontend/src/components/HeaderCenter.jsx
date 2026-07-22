import React, { useState } from "react";
import { NavLink } from "react-router-dom";


const HeaderCenter = ({requireLogin}) => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Practice", path: "/practice" },
    { name: "Learn DSA", path: "/learndsa" },
    { name: "Progress", path: "/progress" },
  ];

  return (
    <nav className="flex gap-8">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          onClick={link.name !== "Home" ? (e) => requireLogin(e) : undefined}
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
