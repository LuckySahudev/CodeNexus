import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [isHome,setIsHome] = useState(false);

  const requireLogin = (e) => {
    if (!isLogin) {
      e.preventDefault();
      setShowLogin(true);
      return;
    }
  };

  return (
    <div className=" flex flex-col bg-mist-900 h-screen w-full border-2 border-whi">
      <Header
        theme={theme}
        setTheme={setTheme}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        userName={userName}
        setUserName={setUserName}
        requireLogin={requireLogin}
        isHome={isHome}
        setIsHome={setIsHome}
      />
      <Main
        theme={theme}
        setTheme={setTheme}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        userName={userName}
        setUserName={setUserName}
        requireLogin={requireLogin}
        isHome={isHome}
        setIsHome={setIsHome}
      />
    </div>
  );
};

export default App;
