import React from "react";
import {FolderBookmark , ChartNoAxesCombined , Podium , CircleCheckBig} from 'lucide-react';


const PracticeInfo = () => {
  return (
    <section className="h-ful w-[90%] flex flex-col justify-center p-10 border  m-10 rounded-3xl bg-mist-800 ">
      <div className="w-full">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-amber-400">
            Practice Mode
          </h2>

          <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
            Follow a structured roadmap of carefully selected LeetCode
            problems. Learn one DSA pattern at a time and build strong
            problem-solving skills through consistent practice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 flex gap-2 items-center justify-center">
              <FolderBookmark size={24} color="#ffbd2e" /> Pattern Wise
            </h3>

            <p className="text-gray-400">
              Questions are grouped into patterns like Arrays,
              Binary Search, Sliding Window, Trees, Graphs, DP and more.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 flex gap-2 items-center justify-center" >
              <ChartNoAxesCombined size={24} color="#ffbd2e"  />Difficulty Progression
            </h3>
        
            <p className="text-gray-400">
              Every pattern follows an Easy → Medium → Hard sequence,
              helping you improve step by step.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 flex gap-2 items-center justify-center">
              <CircleCheckBig size={24} color="#ffbd2e" /> Track Progress
            </h3>

            <p className="text-gray-400">
              Mark solved problems, view completion percentage,
              and continue exactly where you stopped.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 flex gap-2 items-center justify-center">
              <Podium size={24} color="#ffbd2e" /> Solve on LeetCode
            </h3>

            <p className="text-gray-400">
              Every question includes a direct link to LeetCode,
              allowing you to practice on the official platform.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PracticeInfo;