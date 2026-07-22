import React from "react";
import { NavLink, Outlet } from "react-router";
import DevNav from "./DevNav";
import DevContainer from "./DevContainer";
import LoginPopUp from "./LoginPopUp";

const Dev = (props) => {
  
  props.setIsHome(false);
  return (
    <div className="w-full h-full flex bg-gray-100">
      {/* Sidebar */}

      {
        props.isLogin && (
          <>
            <DevNav />
            <DevContainer />
          </>
        )
      }

      {
        ! props.isLogin &&(
          props.setShowLogin(true)
        )
      }

      {/* Page Content */}
      
    </div>
  );
};

export default Dev;