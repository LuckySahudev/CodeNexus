import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Practice from './Practice'
import LearnDsa from './LearnDsa'
import DashBoard from "./DashBoard";
import Progress from "./Progress";
import Community from "./Community";
import Dev from "./Dev";
import Bookmark from "./Bookmark"
import Notes from "./Notes";


const Main = (props) => {
  return (
    <main className="h-[90%]  bg-mist-900  text-white ">
      <Routes>
        <Route path="/" element={<Home {...props} /> }></Route>
        <Route path="/dev" element={<Dev {...props} />}>
          <Route path='dashboard' element={<DashBoard {...props} />} ></Route>
          <Route path='practice' element={<Practice/>} ></Route>
          <Route path='learndsa' element={<LearnDsa/>} ></Route>
          <Route path='progress' element={<Progress/>} ></Route>
          <Route path="community" element={<Community/>}></Route>
          <Route path='bookmarks' element={<Bookmark/>} ></Route>
          <Route path='notes' element={<Notes/>} ></Route>

        </Route>
      </Routes>
    </main>
  );
};

export default Main;
