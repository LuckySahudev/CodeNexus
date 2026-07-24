import {
  BookOpen,
  Code2,
  Trophy,
  Flame,
  PlayCircle,
  Target,
  ChevronRight,
} from "lucide-react";


export default function Dashboard(props) {
  return (
    <div className="min-h-screen bg-mist-950 rounded-2xl border border-gray-600 text-white p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome Back {props.userName} 👋
        </h1>

        <p className="text-gray-400  text-base">
          Continue your DSA journey and crack coding interviews.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

        <Card
          icon={<BookOpen />}
          title="Solved"
          value="0"
        />

        <Card
          icon={<Target />}
          title="Remaining"
          value="250"
        />

        <Card
          icon={<Flame />}
          title="Daily Streak"
          value="12 Days"
        />

        <Card
          icon={<Trophy />}
          title="Completion"
          value="29%"
        />

      </div>

      {/* Middle Section */}

      <div className="grid lg:grid-cols-3 gap-6 my-10">

        {/* Continue Learning */}
        <div className="bg-mist-900 rounded-xl p-5 border border-mist-700">

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

            <button className="mt-5 text-lg px-5 py-2 border rounded-lg border-blue-600 hover:border-blue-700  text-blue-600 hover:text-blue-700 cursor-pointer">
              Continue
            </button>

          </div>

        </div>

        {/* Last Practice */}
        <div className="bg-mist-900 rounded-xl p-5 border border-mist-700">

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

            <button className="mt-5 px-5 py-2 text-lg rounded-lg border border-green-600 hover:border-green-700 cursor-pointer text-green-600 hover:text-green-700">
              Practice Again
            </button>

          </div>

        </div>

        {/* Daily Goal */}
        <div className="bg-mist-900 rounded-xl p-5 border border-mist-700">

          <h2 className="text-xl font-semibold">
            Today's Goal
          </h2>

          <div className="mt-4">

            <p className="text-lg font-bold">
              2 / 5
            </p>

            <div className="w-full h-1 bg-zinc-800 rounded-full mt-1">

              <div className="w-2/5 h-full bg-amber-500 rounded-full"></div>

            </div>

            <p className="text-gray-400 text-sm mt-1">
              Solve 3 more problems today.
            </p>

            <button className="mt-4 px-5 py-2 text-lg rounded-lg border border-amber-600 hover:border-amber-700 cursor-pointer text-amber-600 hover:text-amber-700">
              See Progress
            </button>

          </div>

        </div>

      </div>

      

      {/* Activity */}
      <div className="mt-10 bg-mist-900 rounded-xl p-6 border border-mist-700">

        <h2 className="text-2xl font-bold">
          Weekly Activity
        </h2>

        <div className="mt-6 h-60 flex items-center justify-center border-2 border-dashed border-mist-700 rounded-lg">

          Chart Goes Here

        </div>

      </div>

    </div>
  );
}

function Card({ icon, title, value, color }) {
  return (
    <div className="bg-mist-900 rounded-xl p-3 px-4 border border-mist-700">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-400 text-xl">
            {title}
          </p>

          <h2 className={`font-bold text-xl  text-amber-500`}>
            {value}
          </h2>

        </div>

        <div className=" p-3 rounded-lg">
          {icon}
        </div>

      </div>

    </div>
  );
}