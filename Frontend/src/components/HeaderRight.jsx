import React, { useState } from "react";
import { Moon, BellRing, Sun} from "lucide-react";
import LoginPopUp from "./LoginPopUp";

const HeaderRight = ({theme,setTheme,showLogin,setShowLogin,isLogin,setIsLogin,userName,setUserName}) => {

  return (
    <>
      <div className="flex items-center gap-2">

        {isLogin && (<div className="hover:bg-mist-800 p-3 rounded-full cursor-pointer">
          <BellRing size={18} />
        </div>)}

        <button
          className="hover:bg-mist-800 p-3 rounded-full active:scale-[97%] cursor-pointer"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          { theme === "light" ? <Sun size={16} /> : <Moon size={16} /> }
        </button>

        <button
          onClick={() => setShowLogin(true)}
          className="text-amber-500 active:scale-[98%] cursor-pointer ml-5 px-4 py-1 border border-amber-500 font-bold rounded-md text-md hover:border-amber-400 hover:text-amber-400"
        >
          {isLogin ? userName : "Login"}
        </button>

      </div>

      {/* Login Modal */}
      {showLogin && (!isLogin) && (<LoginPopUp setIsLogin={setIsLogin} setShowLogin = {setShowLogin} setUserName ={setUserName} />)}
    </>
  );
};

export default HeaderRight;
