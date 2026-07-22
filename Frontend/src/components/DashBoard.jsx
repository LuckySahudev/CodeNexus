import {
  BookOpen,
  Code2,
  Trophy,
  Flame,
  PlayCircle,
  Target,
  ChevronRight,
} from "lucide-react";

const roadmap = [
  "1D Array",
  "2D Array",
  "String",
  "Linked List",
  "Stack",
  "Queue",
  "HashMap",
  "Tree",
  "Heap",
  "Graph",
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 mt-2">
          Continue your DSA journey and crack coding interviews.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

        <Card
          icon={<BookOpen />}
          title="Solved"
          value="72"
          color="text-green-400"
        />

        <Card
          icon={<Target />}
          title="Remaining"
          value="173"
          color="text-red-400"
        />

        <Card
          icon={<Flame />}
          title="Daily Streak"
          value="12 Days"
          color="text-orange-400"
        />

        <Card
          icon={<Trophy />}
          title="Completion"
          value="29%"
          color="text-yellow-400"
        />

      </div>

      {/* Middle Section */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        {/* Continue Learning */}
        <div className="bg-zinc-900 rounded-xl p-5">

          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">
              Continue Learning
            </h2>

            <PlayCircle />
          </div>

          <div className="mt-5">

            <p className="text-lg font-medium">
              Sliding Window
            </p>

            <p className="text-gray-400 text-sm">
              Last watched: Variable Window
            </p>

            <button className="mt-5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">
              Continue
            </button>

          </div>

        </div>

        {/* Last Practice */}
        <div className="bg-zinc-900 rounded-xl p-5">

          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">
              Last Practice
            </h2>

            <Code2 />
          </div>

          <div className="mt-5">

            <p className="font-medium">
              Two Sum
            </p>

            <p className="text-gray-400 text-sm">
              Solved Yesterday
            </p>

            <button className="mt-5 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700">
              Practice Again
            </button>

          </div>

        </div>

        {/* Daily Goal */}
        <div className="bg-zinc-900 rounded-xl p-5">

          <h2 className="text-xl font-semibold">
            Today's Goal
          </h2>

          <div className="mt-5">

            <p className="text-4xl font-bold">
              2 / 5
            </p>

            <div className="w-full h-3 bg-zinc-800 rounded-full mt-5">

              <div className="w-2/5 h-full bg-blue-500 rounded-full"></div>

            </div>

            <p className="text-gray-400 mt-3">
              Solve 3 more problems today.
            </p>

          </div>

        </div>

      </div>

      {/* Roadmap */}
      <div className="mt-10">

        <div className="flex justify-between mb-5">

          <h2 className="text-2xl font-bold">
            DSA Roadmap
          </h2>

          <button className="flex items-center gap-2 text-blue-400">
            View All
            <ChevronRight size={18} />
          </button>

        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">

          {roadmap.map((item) => (

            <div
              key={item}
              className="bg-zinc-900 hover:bg-zinc-800 rounded-xl p-5 cursor-pointer transition"
            >
              <BookOpen className="mb-4 text-blue-400" />

              <h3 className="font-medium">
                {item}
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                10 / 25 Solved
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Activity */}
      <div className="mt-10 bg-zinc-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold">
          Weekly Activity
        </h2>

        <div className="mt-6 h-60 flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg">

          Chart Goes Here

        </div>

      </div>

    </div>
  );
}

function Card({ icon, title, value, color }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-5">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-400">
            {title}
          </p>

          <h2 className={`text-3xl font-bold mt-2 ${color}`}>
            {value}
          </h2>

        </div>

        <div className="bg-zinc-800 p-3 rounded-lg">
          {icon}
        </div>

      </div>

    </div>
  );
}