import { Link, Outlet, NavLink } from "react-router-dom";
import React from "react";
import Practice from "../../../../CodeNexusTest/Frontend/src/components/Practice";
import PracticeInfo from "./PracticeInfo";
import LearnDsaInfo from "./LearndsaInfo";
import { useState } from "react";

const HeroSection = ({ setShowLogin, isLogin, requireLogin }) => {


  const [select , setSelect] = useState(<PracticeInfo/>)

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

        <button
          className={ `px-7 py-3 rounded-lg border transition font-semibold ${
                select == <PracticeInfo/> ? "bg-amber-500 border-amber-500 text-black"
                : "border-gray-600 text-white "
            }   hover:border-amber-500 `
          }
          onClick={()=>{
            setSelect(<PracticeInfo/>)
          }}
          
        >
          Practice Mode
        </button>

        <button
          className={ `px-7 py-3 rounded-lg border transition font-semibold ${
                select == <PracticeInfo/> ? "bg-amber-500 border-amber-500 text-black"
                : "border-gray-600 text-white"
            }    hover:border-amber-500 `
          }
          onClick={()=>{
            setSelect(<LearnDsaInfo/>)
          }}
        >
          Learn Mode
        </button>

      </div>
          {select}
    </section>
  );
};

export default HeroSection;
