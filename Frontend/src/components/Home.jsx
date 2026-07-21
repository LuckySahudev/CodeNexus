import React from "react";
import HeroSection from "./HeroSection";
import ProgressCard from "./ProgressCard";
import RoadmapGrid from "./RoadmapGrid";

const Home = () => {
  return (
    <div className=" mx-auto px-8 py-10 h-full overflow-auto">
      <HeroSection />
      <ProgressCard />
      <RoadmapGrid />
    </div>
  );
};

export default Home;
