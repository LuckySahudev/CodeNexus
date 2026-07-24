import { useState } from "react";
import {
  Search,
  Plus,
  Heart,
  MessageSquare,
  Trophy,
  Flame,
  Users,
  Hash,
  Pin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const posts = [
  {
    id: 1,
    author: "Lucky",
    title: "Need help with Sliding Window",
    content:
      "I'm confused about variable-size sliding window. Can someone explain it with an example?",
    likes: 21,
    comments: 8,
    tag: "Question",
  },
  {
    id: 2,
    author: "Rahul",
    title: "Solved my first Hard problem 🎉",
    content:
      "Finally solved Trapping Rain Water after 2 hours. Keep practicing!",
    likes: 47,
    comments: 15,
    tag: "Achievement",
  },
  {
    id: 3,
    author: "Priya",
    title: "Binary Search Trick",
    content:
      "Always think about the search space instead of the array. It helps in many problems.",
    likes: 33,
    comments: 9,
    tag: "Tip",
  },
];

const leaderboard = [
  { name: "Lucky", xp: 4200 },
  { name: "Rahul", xp: 3950 },
  { name: "Amit", xp: 3600 },
];

export default function Community() {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) => {
    const query = search.toLowerCase();

    return (
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query) ||
      post.tag.toLowerCase().includes(query)
    );
  });

  const getTagColor = (tag) => {
    switch (tag) {
      case "Question":
        return "bg-blue-500/20 text-blue-400";
      case "Achievement":
        return "bg-green-500/20 text-green-400";
      case "Tip":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-zinc-700 text-zinc-300";
    }
  };

  return (
    <div className="flex p-6 border  border-mist-700 bg-mist-950 gap-6 rounded-2xl h-full ">
      {/* ================= Feed ================= */}

      <div className="flex-1 flex flex-col space-y-6">
        {/* Search + Create */}

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              placeholder="Search discussions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-mist-800 border text-lg border-zinc-700 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-amber-500"
            />
          </div>

          <button className="flex items-center gap-2 border bg-mist-800 cursor-pointer   border-amber-500 hover:border-amber-400 text-amber-500 hover:text-amber-400 text-lg font-semibold px-5 rounded-xl">
            <Plus size={18} />
            Create Post
          </button>
        </div>

        {/* Posts */}

        <div className="space-y-5 overflow-y-auto scrollbar-hide flex-1 ">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-mist-800 border border-zinc-700 rounded-2xl p-6 hover:border-amber-500 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{post.title}</h2>

                  <p className="text-sm text-zinc-400 mt-1">
                    Posted by {post.author}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${getTagColor(
                    post.tag,
                  )}`}
                >
                  {post.tag}
                </span>
              </div>

              <p className="mt-5 text-zinc-300 leading-relaxed">
                {post.content}
              </p>

              <div className="flex gap-6 mt-6">
                <button className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition">
                  <Heart size={18} />
                  {post.likes}
                </button>

                <button className="flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition">
                  <MessageSquare size={18} />
                  {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Right Sidebar ================= */}

      <aside
        className={`relative transition-all duration-300 overflow-y-auto scrollbar-hide  border-zinc-700 ${
          isOpen ? "w-80 border-l" : "ml-5"
        }`}
      >
        {/* Toggle */}

        <div className="w-full bg-mist-950 pb-1 flex justify-end sticky top-0 z-10 ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" z-0  w-8 h-8 ml-5 mb-3 rounded-lg bg-mist-700 border border-zinc-600 flex items-center justify-center hover:border-amber-500"
          >
            {isOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {isOpen && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen ? "opacity-100 pl-5" : "opacity-0 p-2"
            }`}
          >
            {/* Leaderboard */}

            <div className="bg-mist-800 rounded-xl  border border-zinc-700 p-5 mb-5">
              <div className="flex items-center gap-2 font-semibold mb-4">
                <Trophy className="text-yellow-400" size={20} />
                Leaderboard
              </div>

              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div key={user.name} className="flex justify-between text-sm">
                    <span>
                      #{index + 1} {user.name}
                    </span>

                    <span className="text-amber-400">{user.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}

            <div className="bg-mist-800 rounded-xl border border-zinc-700 p-5 mb-5">
              <div className="flex items-center gap-2 font-semibold mb-4">
                <Users className="text-green-400" size={20} />
                Community Stats
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Members</span>
                  <span>12,483</span>
                </div>

                <div className="flex justify-between">
                  <span>Posts</span>
                  <span>3,241</span>
                </div>

                <div className="flex justify-between">
                  <span>Today's Posts</span>
                  <span>47</span>
                </div>
              </div>
            </div>

            {/* Trending Tags */}

            <div className="bg-mist-800 rounded-xl border border-zinc-700 p-5 mb-5">
              <div className="flex items-center gap-2 font-semibold mb-4">
                <Hash className="text-sky-400" size={20} />
                Trending Tags
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "Sliding Window",
                  "Graphs",
                  "Binary Search",
                  "DP",
                  "Trees",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-zinc-700 text-sm hover:bg-amber-500 hover:text-black cursor-pointer transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Pinned */}

            <div className="bg-mist-800 rounded-xl border border-zinc-700 p-5">
              <div className="flex items-center gap-2 font-semibold mb-4">
                <Pin className="text-red-400" size={20} />
                Pinned
              </div>

              <p className="text-sm text-zinc-300">
                Read the Community Guidelines before posting.
              </p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
