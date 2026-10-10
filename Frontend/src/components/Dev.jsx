import React from "react";
import { NavLink, Outlet } from "react-router";
import DevNav from "./DevNav";
import DevContainer from "./DevContainer";

const Dev = (props) => {
  
  props.setIsHome(false);
  return (
    <div className="w-full h-full flex bg-mist-900 text-white">
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
