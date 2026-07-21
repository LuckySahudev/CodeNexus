import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Practice from "../../../../CodeNexusTest/Frontend/src/components/Practice";
import PracticeInfo from "./PracticeInfo";
import LearnDsaInfo from "./LearndsaInfo";

// import Practice from './Practice'
// import LearnDSA from './LearnDSA'
// import Progress from './Progress'

const Main = (props) => {
  return (
    <main className="h-[90%]  bg-mist-900  text-white overflow-y-scroll scrollbar-hide">
      <Routes>
        <Route path="/" element={<Home {...props} />}>
          { !props.isLogin && (
            <Route index element={<Navigate to="/practiceinfo" replace />} />
          )}
          <Route path="practiceinfo" element={<PracticeInfo />}></Route>
          <Route path="learndsainfo" element={<LearnDsaInfo />}></Route>
        </Route>
        {/* <Route path='/practice' element={<Practice/>} ></Route>
        <Route path='/learndsa' element={<LearnDSA/>} ></Route>
        <Route path='/progress' element={<Progress/>} ></Route> */}
      </Routes>
    </main>
  );
};

export default Main;
