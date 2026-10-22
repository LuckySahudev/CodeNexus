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
import Notes, { NotesSection } from "./Notes";


const Main = (props) => {
  return (
    <main className="min-h-0 flex-1 bg-mist-900 text-white">
      <Routes>
        <Route path="/" element={<Home {...props} /> }></Route>
        <Route path="/dev" element={<Dev {...props} />}>
          <Route path='dashboard' element={<DashBoard {...props} />} ></Route>
          <Route path='practice' element={<Practice/>} ></Route>
          <Route path='learndsa' element={<LearnDsa/>} ></Route>
          <Route path='progress' element={<Progress/>} ></Route>
          <Route path="community" element={<Community/>}></Route>
          <Route path='bookmarks' element={<Bookmark/>} ></Route>
          <Route path='notes' element={<Notes />}>
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<NotesSection section="general" />} />
            <Route path="questions" element={<NotesSection section="questions" />} />
            <Route path="interview" element={<NotesSection section="interview" />} />
          </Route>

        </Route>
      </Routes>
    </main>
  );
};

export default Main;
