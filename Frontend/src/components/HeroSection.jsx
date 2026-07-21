import { Link, Outlet, NavLink } from "react-router-dom";
import React from "react";

const HeroSection = ({ setShowLogin, isLogin, requireLogin }) => {
  return (
    <section className=" flex flex-col items-center justify-center text-center my-10">
      <h1 className="text-5xl font-bold text-white leading-tight flex gap-3">
        <span>Master DSA</span>
        <span className=" text-amber-500">Pattern by Pattern</span>
      </h1>

      <p className="mt-3 max-w-2xl text-lg text-gray-400">
        Practice curated LeetCode questions, track your progress, and become
        interview ready.
      </p>

      <div className="mt-10 flex gap-5">
        <NavLink
          to="/practiceinfo"
          className={({ isActive }) =>
            `px-7 py-3 rounded-lg border transition font-semibold ${
              isActive
                ? "bg-amber-500 border-amber-500 text-black"
                : "border-gray-600 text-white hover:border-amber-500"
            }`
          }
        >
          Practice Mode
        </NavLink>

        <NavLink
          to="/learndsainfo"
          className={({ isActive }) =>
            `px-7 py-3 rounded-lg border transition font-semibold ${
              isActive
                ? "bg-amber-500 border-amber-500 text-black"
                : "border-gray-600 text-white hover:border-amber-500"
            }`
          }
        >
          Learn Mode
        </NavLink>
      </div>

      <Outlet />
    </section>
  );
};

export default HeroSection;
