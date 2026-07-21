import React from "react";
import {
  BookOpen,
  Brain,
  Code2,
  GraduationCap,
} from "lucide-react";

const LearnDsaInfo = () => {
  return (
    <section className="h-full w-[90%] flex flex-col justify-center p-10 border m-10 rounded-3xl bg-mist-800">
      <div className="w-full">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-amber-400">
            Learn DSA
          </h2>

          <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
            Build a strong foundation in Data Structures and Algorithms with
            structured notes, visual explanations, examples, and interview
            focused concepts before jumping into coding problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 flex gap-2 items-center justify-center">
              <BookOpen size={24} color="#ffbd2e" />
              Structured Notes
            </h3>

            <p className="text-gray-400">
              Learn every DSA pattern through beginner-friendly notes with
              clear explanations and important concepts.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 flex gap-2 items-center justify-center">
              <Brain size={24} color="#ffbd2e" />
              Visual Learning
            </h3>

            <p className="text-gray-400">
              Understand algorithms using diagrams, animations, and
              step-by-step walkthroughs instead of memorizing solutions.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 flex gap-2 items-center justify-center">
              <Code2 size={24} color="#ffbd2e" />
              Code Examples
            </h3>

            <p className="text-gray-400">
              Study clean implementations with detailed explanations,
              time complexity, and space complexity analysis.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 flex gap-2 items-center justify-center">
              <GraduationCap size={24} color="#ffbd2e" />
              Interview Focused
            </h3>

            <p className="text-gray-400">
              Learn the concepts and patterns that are frequently asked in
              coding interviews at top product-based companies.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LearnDsaInfo;