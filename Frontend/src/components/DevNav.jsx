import {
  LayoutDashboard,
  Code2,
  BookOpen,
  Map,
  BarChart3,
  Bookmark,
  CalendarCheck,
  Trophy,
  FileText,
  Crown,
  UserCircle2,
  TextAlignStart,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const navs = [
  {
    name: "Dashboard",
    path: "/dev/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: "Practice",
    path: "/dev/practice",
    icon: <Code2 size={18} />,
  },
  {
    name: "Learn DSA",
    path: "/dev/learndsa",
    icon: <BookOpen size={18} />,
  },
  {
    name: "Roadmap",
    path: "/dev/roadmap",
    icon: <Map size={18} />,
  },
  {
    name: "Progress",
    path: "/dev/progress",
    icon: <BarChart3 size={18} />,
  },
  {
    name: "Bookmarks",
    path: "/dev/bookmarks",
    icon: <Bookmark size={18} />,
  },
  {
    name: "Daily Challenge",
    path: "/dev/daily",
    icon: <CalendarCheck size={18} />,
  },
  {
    name: "Contests",
    path: "/dev/community",
    icon: <Trophy size={18} />,
  },
  {
    name: "Notes",
    path: "/dev/notes",
    icon: <FileText size={18} />,
  },
];

export default function DevNav() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="w-auto h-full bg-mist-950  flex flex-col">
      {/* Logo */}
      <div className={`px-3 py-4 border-b border-gray-800 w-full flex ${isOpen ? "justify-end" : "justify-center" }`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2  rounded-xl border border-gray-600 flex items-center justify-center hover:bg-[#1B2233] transition-all duration-300"
        >
          {! isOpen ? (
            <TextAlignStart size={20} strokeWidth={2} />
          ) : (
            <ChevronLeft size={20} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className=" h-[50%] flex-1 px-3 py-5 space-y-1 overflow-y-scroll scrollbar-hide">
        {navs.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              ` flex items-center gap-3 px-4 py-3  my-2 rounded-lg transition-all
              ${
                isActive
                  ? "bg-amber-500 text-black font-semibold"
                  : "text-gray-400 hover:bg-[#161F2E] hover:text-white"
              }`
            }
          >
            {isOpen && (
              <>
                {item.icon}
                <span className="flex justify-start w-40">{item.name}</span>
              </>
            )}

            {!isOpen && item.icon}
          </NavLink>
        ))}
      </div>

      {/* User */}
      {isOpen && (
        <div className="border-t border-gray-800 p-4 flex items-center gap-3">
          <UserCircle2 size={40} className="text-gray-300" />

          <div>
            <p className="text-white font-medium">Lucky</p>
            <p className="text-xs text-gray-400">lucky@gmail.com</p>
          </div>
        </div>
      )}
    </aside>
  );
}
