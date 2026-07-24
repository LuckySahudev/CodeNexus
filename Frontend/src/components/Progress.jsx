import { useState } from "react";

import {
  Trophy,
  Flame,
  Target,
  CheckCircle2,
  TrendingUp,
  Activity,
  BrainCircuit,
  Database,
} from "lucide-react";

const dataStructureProgress = [
  { name: "1D Array", progress: 80 },
  { name: "2D Array", progress: 55 },
  { name: "String", progress: 42 },
  { name: "Linked List", progress: 28 },
  { name: "Stack", progress: 18 },
  { name: "Queue", progress: 10 },
  { name: "HashSet", progress: 15 },
  { name: "HashMap", progress: 25 },
  { name: "Tree", progress: 5 },
  { name: "Heap", progress: 3 },
  { name: "Graph", progress: 2 },
];

const recent = [
  "Two Sum",
  "Best Time to Buy and Sell Stock",
  "Contains Duplicate",
  "Valid Parentheses",
  "Binary Search",
];

const algorithmProgress = [
  { name: "Linear Search", progress: 100 },
  { name: "Binary Search", progress: 80 },
  { name: "Two Pointer", progress: 60 },
  { name: "Sliding Window", progress: 50 },
  { name: "Prefix Sum", progress: 35 },
  { name: "Bubble Sort", progress: 100 },
  { name: "Selection Sort", progress: 90 },
  { name: "Insertion Sort", progress: 85 },
  { name: "Cycle Sort", progress: 20 },
  { name: "Quick Sort", progress: 20 },
  { name: "Merge Sort", progress: 18 },
  { name: "Slow Fast", progress: 30 },
  { name: "Dummy Node", progress: 15 },
  { name: "Monotonic Stack", progress: 12 },
  { name: "Binary Tree", progress: 22 },
  { name: "Binary Search Tree", progress: 18 },
  { name: "DFS", progress: 10 },
  { name: "Kth Element", progress: 8 },
  { name: "Bit Manipulation", progress: 12 },
  { name: "DP 1", progress: 5 },
  { name: "DP 2", progress: 3 },
  { name: "DP 3", progress: 2 },
  { name: "DP 4", progress: 1 },
];

export default function Progress() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 bg-mist-950 rounded-2xl border border-mist-700">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Your Progress
        </h1>

        <p className="mt-2 text-gray-400 text-lg">
          Track your coding journey and stay interview ready.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Solved"
          value="72"
          icon={<CheckCircle2 size={24} />}
        />

        <StatCard
          title="Streak"
          value="12 Days"
          icon={<Flame size={24} />}
        />

        <StatCard
          title="Accuracy"
          value="84%"
          icon={<Target size={24} />}
        />

        <StatCard
          title="Achievements"
          value="8"
          icon={<Trophy size={24} />}
        />

      </div>

      {/* Overall Progress */}

      <div className="mt-8 rounded-xl border border-mist-700 bg-mist-900 p-4">

        <div className="mb-5 flex items-center gap-3">

          <TrendingUp
            size={24}
            className="text-amber-400"
          />

          <h2 className="text-xl font-semibold text-white">
            Overall Progress
          </h2>

        </div>

        <div className="h-2 w-full rounded-full bg-mist-800">

          <div
            style={{ width: "29%" }}
            className="h-full rounded-full bg-amber-500"
          />

        </div>

        <div className="mt-3 flex justify-between text-sm">

          <span className="text-gray-400">
            72 / 245 Questions Solved
          </span>

          <span className="font-medium text-amber-400">
            29%
          </span>

        </div>

      </div>

      {/* Next Part */}

            {/* Difficulty & Recent Activity */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        {/* Difficulty Breakdown */}

        <div className="rounded-xl border border-mist-700 bg-mist-900 p-6">

          <h2 className="mb-6 text-xl font-semibold text-white">
            Difficulty Breakdown
          </h2>

          <ProgressBar
            label="Easy"
            value={65}
            textColor="text-green-400"
          />

          <ProgressBar
            label="Medium"
            value={30}
            textColor="text-yellow-400"
          />

          <ProgressBar
            label="Hard"
            value={10}
            textColor="text-red-400"
          />

        </div>

        {/* Recent Activity */}

        <div className="rounded-xl border border-mist-700 bg-mist-900 p-6">

          <div className="mb-6 flex items-center gap-3">

            <Activity
              size={22}
              className="text-amber-400"
            />

            <h2 className="text-xl font-semibold text-white">
              Recent Activity
            </h2>

          </div>

          <div className="space-y-3 ">

            {recent.map((question, index) => (

              <div
                key={index}
                className=" flex items-center justify-between rounded-lg border border-mist-700 bg-mist-800 px-4 py-3 transition hover:border-amber-500/40"
              >

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    size={18}
                    className="text-green-400"
                  />

                  <span className="text-white">
                    {question}
                  </span>

                </div>

                <span className="text-sm text-gray-400">
                  Solved
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Next Part */}
            {/* Topic Progress */}

      <div className="mt-8 grid  gap-6 lg:grid-cols-2">

        {/* Data Structures */}

        <div className="rounded-xl border border-mist-700 bg-mist-900 p-6 overflow-y-scroll scrollbar-hide">

          <div className="mb-6 flex items-center gap-3">

            <Database
              size={22}
              className="text-amber-400"
            />

            <h2 className="text-xl font-semibold text-white">
              Data Structures
            </h2>

          </div>

          <div className="space-y-5">

            {dataStructureProgress.map((item) => (

              <ProgressBar
                key={item.name}
                label={item.name}
                value={item.progress}
              />

            ))}

          </div>

        </div>

        {/* Algorithms */}

        <div className="rounded-xl border border-mist-700 bg-mist-900 p-6 ">

          <div className="mb-6 flex items-center gap-3 ">

            <BrainCircuit
              size={22}
              className="text-amber-400"
            />

            <h2 className="text-xl font-semibold text-white">
              Algorithms
            </h2>

          </div>

          <div className="space-y-5 max-h-[650px]  overflow-y-scroll scrollbar-hide">

            {algorithmProgress.map((item) => (

              <ProgressBar
                key={item.name}
                label={item.name}
                value={item.progress}
              />

            ))}

          </div>

        </div>

      </div>

    </div>
  );  
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-xl border border-mist-700 bg-mist-900 p-3 transition hover:border-amber-500/40 hover:bg-mist-800">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            {value}
          </h2>

        </div>

        <div className="rounded-lg bg-amber-500/10 p-3 text-amber-400">
          {icon}
        </div>

      </div>

    </div>
  );
}

function ProgressBar({ label, value, textColor = "text-white" }) {
  return (
    <div className="mt-4">

      <div className="mb-1 flex items-center justify-between">

        <span className={`text-lg font-medium `}>
          {label}
        </span>

        <span className="text-sm text-gray-400">
          {value}%
        </span>

      </div>

      <div className="h-1 w-full overflow-hidden rounded-full bg-mist-800">

        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-500"
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
}