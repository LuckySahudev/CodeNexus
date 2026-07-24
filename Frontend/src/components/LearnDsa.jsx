import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Database,
  BrainCircuit,
  NotebookPen ,
} from "lucide-react";

const dataStructureTitles = [
  "1D Array",
  "2D Array",
  "String",
  "Linked List",
  "Stack",
  "Queue",
  "HashSet",
  "HashMap",
  "Tree",
  "Heap",
  "Graph",
];

const algorithmTitles = [
  "Linear Search",
  "Binary Search",
  "Two Pointer",
  "Sliding Window",
  "Prefix Sum",
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
  "Cycle Sort",
  "Quick Sort",
  "Merge Sort",
  "Slow Fast",
  "Dummy Node",
  "Monotonic Stack",
  "Binary Tree",
  "Binary Search Tree",
  "DFS",
  "Kth Element Problems",
  "Bit Manipulation",
  "Dynamic Programming 1 (1D DP)",
  "DP 2 (2D DP)",
  "DP 3 (Subsequence)",
  "DP 4 (Knapsack)",
];

const dataStructuresQuestions = [
  [
    {
      id: 1001,
      leetcodeId: 1920,
      title: "Build Array from Permutation",
      slug: "build-array-from-permutation",
      difficulty: "Easy",
    },
    {
      id: 1002,
      leetcodeId: 1480,
      title: "Running Sum of 1d Array",
      slug: "running-sum-of-1d-array",
      difficulty: "Easy",
    },
    {
      id: 1003,
      leetcodeId: 1672,
      title: "Richest Customer Wealth",
      slug: "richest-customer-wealth",
      difficulty: "Easy",
    },
    {
      id: 1004,
      leetcodeId: 1929,
      title: "Concatenation of Array",
      slug: "concatenation-of-array",
      difficulty: "Easy",
    },
    {
      id: 1005,
      leetcodeId: 26,
      title: "Remove Duplicates from Sorted Array",
      slug: "remove-duplicates-from-sorted-array",
      difficulty: "Easy",
    },
    {
      id: 1006,
      leetcodeId: 27,
      title: "Remove Element",
      slug: "remove-element",
      difficulty: "Easy",
    },
    {
      id: 1007,
      leetcodeId: 88,
      title: "Merge Sorted Array",
      slug: "merge-sorted-array",
      difficulty: "Easy",
    },
    {
      id: 1008,
      leetcodeId: 66,
      title: "Plus One",
      slug: "plus-one",
      difficulty: "Easy",
    },
    {
      id: 1009,
      leetcodeId: 724,
      title: "Find Pivot Index",
      slug: "find-pivot-index",
      difficulty: "Easy",
    },
    {
      id: 1010,
      leetcodeId: 485,
      title: "Max Consecutive Ones",
      slug: "max-consecutive-ones",
      difficulty: "Easy",
    },
  ],
  [
    {
      id: 1101,
      leetcodeId: 867,
      title: "Transpose Matrix",
      slug: "transpose-matrix",
      difficulty: "Easy",
    },
    {
      id: 1102,
      leetcodeId: 566,
      title: "Reshape the Matrix",
      slug: "reshape-the-matrix",
      difficulty: "Easy",
    },
    {
      id: 1103,
      leetcodeId: 1572,
      title: "Matrix Diagonal Sum",
      slug: "matrix-diagonal-sum",
      difficulty: "Easy",
    },
    {
      id: 1104,
      leetcodeId: 766,
      title: "Toeplitz Matrix",
      slug: "toeplitz-matrix",
      difficulty: "Easy",
    },
    {
      id: 1105,
      leetcodeId: 463,
      title: "Island Perimeter",
      slug: "island-perimeter",
      difficulty: "Easy",
    },
    {
      id: 1106,
      leetcodeId: 1260,
      title: "Shift 2D Grid",
      slug: "shift-2d-grid",
      difficulty: "Easy",
    },
    {
      id: 1107,
      leetcodeId: 840,
      title: "Magic Squares In Grid",
      slug: "magic-squares-in-grid",
      difficulty: "Easy",
    },
    {
      id: 1108,
      leetcodeId: 1351,
      title: "Count Negative Numbers in a Sorted Matrix",
      slug: "count-negative-numbers-in-a-sorted-matrix",
      difficulty: "Easy",
    },
    {
      id: 1109,
      leetcodeId: 1380,
      title: "Lucky Numbers in a Matrix",
      slug: "lucky-numbers-in-a-matrix",
      difficulty: "Easy",
    },
    {
      id: 1110,
      leetcodeId: 3033,
      title: "Modify the Matrix",
      slug: "modify-the-matrix",
      difficulty: "Easy",
    },
  ],
  [
    {
      id: 1201,
      leetcodeId: 709,
      title: "To Lower Case",
      slug: "to-lower-case",
      difficulty: "Easy",
    },
    {
      id: 1202,
      leetcodeId: 344,
      title: "Reverse String",
      slug: "reverse-string",
      difficulty: "Easy",
    },
    {
      id: 1203,
      leetcodeId: 125,
      title: "Valid Palindrome",
      slug: "valid-palindrome",
      difficulty: "Easy",
    },
    {
      id: 1204,
      leetcodeId: 387,
      title: "First Unique Character in a String",
      slug: "first-unique-character-in-a-string",
      difficulty: "Easy",
    },
    {
      id: 1205,
      leetcodeId: 383,
      title: "Ransom Note",
      slug: "ransom-note",
      difficulty: "Easy",
    },
    {
      id: 1206,
      leetcodeId: 242,
      title: "Valid Anagram",
      slug: "valid-anagram",
      difficulty: "Easy",
    },
    {
      id: 1207,
      leetcodeId: 28,
      title: "Find the Index of the First Occurrence in a String",
      slug: "find-the-index-of-the-first-occurrence-in-a-string",
      difficulty: "Easy",
    },
    {
      id: 1208,
      leetcodeId: 14,
      title: "Longest Common Prefix",
      slug: "longest-common-prefix",
      difficulty: "Easy",
    },
    {
      id: 1209,
      leetcodeId: 58,
      title: "Length of Last Word",
      slug: "length-of-last-word",
      difficulty: "Easy",
    },
    {
      id: 1210,
      leetcodeId: 392,
      title: "Is Subsequence",
      slug: "is-subsequence",
      difficulty: "Easy",
    },
  ],
  [
    {
      id: 1301,
      leetcodeId: 203,
      title: "Remove Linked List Elements",
      slug: "remove-linked-list-elements",
      difficulty: "Easy",
    },
    {
      id: 1302,
      leetcodeId: 83,
      title: "Remove Duplicates from Sorted List",
      slug: "remove-duplicates-from-sorted-list",
      difficulty: "Easy",
    },
    {
      id: 1303,
      leetcodeId: 206,
      title: "Reverse Linked List",
      slug: "reverse-linked-list",
      difficulty: "Easy",
    },
    {
      id: 1304,
      leetcodeId: 21,
      title: "Merge Two Sorted Lists",
      slug: "merge-two-sorted-lists",
      difficulty: "Easy",
    },
    {
      id: 1305,
      leetcodeId: 160,
      title: "Intersection of Two Linked Lists",
      slug: "intersection-of-two-linked-lists",
      difficulty: "Easy",
    },
    {
      id: 1306,
      leetcodeId: 876,
      title: "Middle of the Linked List",
      slug: "middle-of-the-linked-list",
      difficulty: "Easy",
    },
    {
      id: 1307,
      leetcodeId: 141,
      title: "Linked List Cycle",
      slug: "linked-list-cycle",
      difficulty: "Easy",
    },
    {
      id: 1308,
      leetcodeId: 234,
      title: "Palindrome Linked List",
      slug: "palindrome-linked-list",
      difficulty: "Easy",
    },
    {
      id: 1309,
      leetcodeId: 237,
      title: "Delete Node in a Linked List",
      slug: "delete-node-in-a-linked-list",
      difficulty: "Easy",
    },
    {
      id: 1310,
      leetcodeId: 1290,
      title: "Convert Binary Number in a Linked List to Integer",
      slug: "convert-binary-number-in-a-linked-list-to-integer",
      difficulty: "Easy",
    },
  ],
  [
    {
      id: 1401,
      leetcodeId: 20,
      title: "Valid Parentheses",
      slug: "valid-parentheses",
      difficulty: "Easy",
    },
    {
      id: 1402,
      leetcodeId: 225,
      title: "Implement Stack using Queues",
      slug: "implement-stack-using-queues",
      difficulty: "Easy",
    },
    {
      id: 1403,
      leetcodeId: 232,
      title: "Implement Queue using Stacks",
      slug: "implement-queue-using-stacks",
      difficulty: "Easy",
    },
    {
      id: 1404,
      leetcodeId: 682,
      title: "Baseball Game",
      slug: "baseball-game",
      difficulty: "Easy",
    },
    {
      id: 1405,
      leetcodeId: 844,
      title: "Backspace String Compare",
      slug: "backspace-string-compare",
      difficulty: "Easy",
    },
    {
      id: 1406,
      leetcodeId: 1047,
      title: "Remove All Adjacent Duplicates In String",
      slug: "remove-all-adjacent-duplicates-in-string",
      difficulty: "Easy",
    },
    {
      id: 1407,
      leetcodeId: 1475,
      title: "Final Prices With a Special Discount in a Shop",
      slug: "final-prices-with-a-special-discount-in-a-shop",
      difficulty: "Easy",
    },
    {
      id: 1408,
      leetcodeId: 1598,
      title: "Crawler Log Folder",
      slug: "crawler-log-folder",
      difficulty: "Easy",
    },
    {
      id: 1409,
      leetcodeId: 1614,
      title: "Maximum Nesting Depth of the Parentheses",
      slug: "maximum-nesting-depth-of-the-parentheses",
      difficulty: "Easy",
    },
    {
      id: 1410,
      leetcodeId: 2696,
      title: "Minimum String Length After Removing Substrings",
      slug: "minimum-string-length-after-removing-substrings",
      difficulty: "Easy",
    },
  ],
  [
    {
      id: 1501,
      leetcodeId: 232,
      title: "Implement Queue using Stacks",
      slug: "implement-queue-using-stacks",
      difficulty: "Easy",
    },
    {
      id: 1502,
      leetcodeId: 622,
      title: "Design Circular Queue",
      slug: "design-circular-queue",
      difficulty: "Medium",
    },
    {
      id: 1503,
      leetcodeId: 933,
      title: "Number of Recent Calls",
      slug: "number-of-recent-calls",
      difficulty: "Easy",
    },
    {
      id: 1504,
      leetcodeId: 1700,
      title: "Number of Students Unable to Eat Lunch",
      slug: "number-of-students-unable-to-eat-lunch",
      difficulty: "Easy",
    },
    {
      id: 1505,
      leetcodeId: 2073,
      title: "Time Needed to Buy Tickets",
      slug: "time-needed-to-buy-tickets",
      difficulty: "Easy",
    },
    {
      id: 1506,
      leetcodeId: 225,
      title: "Implement Stack using Queues",
      slug: "implement-stack-using-queues",
      difficulty: "Easy",
    },
    {
      id: 1507,
      leetcodeId: 346,
      title: "Moving Average from Data Stream",
      slug: "moving-average-from-data-stream",
      difficulty: "Easy",
    },
    {
      id: 1508,
      leetcodeId: 649,
      title: "Dota2 Senate",
      slug: "dota2-senate",
      difficulty: "Medium",
    },
    {
      id: 1509,
      leetcodeId: 950,
      title: "Reveal Cards In Increasing Order",
      slug: "reveal-cards-in-increasing-order",
      difficulty: "Medium",
    },
    {
      id: 1510,
      leetcodeId: 994,
      title: "Rotting Oranges",
      slug: "rotting-oranges",
      difficulty: "Medium",
    },
  ],
  [
    {
      id: 1601,
      leetcodeId: 217,
      title: "Contains Duplicate",
      slug: "contains-duplicate",
      difficulty: "Easy",
    },
    {
      id: 1602,
      leetcodeId: 349,
      title: "Intersection of Two Arrays",
      slug: "intersection-of-two-arrays",
      difficulty: "Easy",
    },
    {
      id: 1603,
      leetcodeId: 705,
      title: "Design HashSet",
      slug: "design-hashset",
      difficulty: "Easy",
    },
    {
      id: 1604,
      leetcodeId: 2215,
      title: "Find the Difference of Two Arrays",
      slug: "find-the-difference-of-two-arrays",
      difficulty: "Easy",
    },
    {
      id: 1605,
      leetcodeId: 1832,
      title: "Check if the Sentence Is Pangram",
      slug: "check-if-the-sentence-is-pangram",
      difficulty: "Easy",
    },
    {
      id: 1606,
      leetcodeId: 2351,
      title: "First Letter to Appear Twice",
      slug: "first-letter-to-appear-twice",
      difficulty: "Easy",
    },
    {
      id: 1607,
      leetcodeId: 2716,
      title: "Minimize String Length",
      slug: "minimize-string-length",
      difficulty: "Easy",
    },
    {
      id: 1608,
      leetcodeId: 575,
      title: "Distribute Candies",
      slug: "distribute-candies",
      difficulty: "Easy",
    },
    {
      id: 1609,
      leetcodeId: 929,
      title: "Unique Email Addresses",
      slug: "unique-email-addresses",
      difficulty: "Easy",
    },
    {
      id: 1610,
      leetcodeId: 1684,
      title: "Count the Number of Consistent Strings",
      slug: "count-the-number-of-consistent-strings",
      difficulty: "Easy",
    },
  ],
  [
    {
      id: 1701,
      leetcodeId: 1,
      title: "Two Sum",
      slug: "two-sum",
      difficulty: "Easy",
    },
    {
      id: 1702,
      leetcodeId: 242,
      title: "Valid Anagram",
      slug: "valid-anagram",
      difficulty: "Easy",
    },
    {
      id: 1703,
      leetcodeId: 387,
      title: "First Unique Character in a String",
      slug: "first-unique-character-in-a-string",
      difficulty: "Easy",
    },
    {
      id: 1704,
      leetcodeId: 383,
      title: "Ransom Note",
      slug: "ransom-note",
      difficulty: "Easy",
    },
    {
      id: 1705,
      leetcodeId: 205,
      title: "Isomorphic Strings",
      slug: "isomorphic-strings",
      difficulty: "Easy",
    },
    {
      id: 1706,
      leetcodeId: 219,
      title: "Contains Duplicate II",
      slug: "contains-duplicate-ii",
      difficulty: "Easy",
    },
    {
      id: 1707,
      leetcodeId: 290,
      title: "Word Pattern",
      slug: "word-pattern",
      difficulty: "Easy",
    },
    {
      id: 1708,
      leetcodeId: 13,
      title: "Roman to Integer",
      slug: "roman-to-integer",
      difficulty: "Easy",
    },
    {
      id: 1709,
      leetcodeId: 884,
      title: "Uncommon Words from Two Sentences",
      slug: "uncommon-words-from-two-sentences",
      difficulty: "Easy",
    },
    {
      id: 1710,
      leetcodeId: 1748,
      title: "Sum of Unique Elements",
      slug: "sum-of-unique-elements",
      difficulty: "Easy",
    },
  ],
  [
    {
      id: 1801,
      leetcodeId: 104,
      title: "Maximum Depth of Binary Tree",
      slug: "maximum-depth-of-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 1802,
      leetcodeId: 100,
      title: "Same Tree",
      slug: "same-tree",
      difficulty: "Easy",
    },
    {
      id: 1803,
      leetcodeId: 101,
      title: "Symmetric Tree",
      slug: "symmetric-tree",
      difficulty: "Easy",
    },
    {
      id: 1804,
      leetcodeId: 226,
      title: "Invert Binary Tree",
      slug: "invert-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 1805,
      leetcodeId: 112,
      title: "Path Sum",
      slug: "path-sum",
      difficulty: "Easy",
    },
    {
      id: 1806,
      leetcodeId: 257,
      title: "Binary Tree Paths",
      slug: "binary-tree-paths",
      difficulty: "Easy",
    },
    {
      id: 1807,
      leetcodeId: 111,
      title: "Minimum Depth of Binary Tree",
      slug: "minimum-depth-of-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 1808,
      leetcodeId: 110,
      title: "Balanced Binary Tree",
      slug: "balanced-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 1809,
      leetcodeId: 543,
      title: "Diameter of Binary Tree",
      slug: "diameter-of-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 1810,
      leetcodeId: 404,
      title: "Sum of Left Leaves",
      slug: "sum-of-left-leaves",
      difficulty: "Easy",
    },
  ],
  [
    {
      id: 1901,
      leetcodeId: 1046,
      title: "Last Stone Weight",
      slug: "last-stone-weight",
      difficulty: "Easy",
    },
    {
      id: 1902,
      leetcodeId: 506,
      title: "Relative Ranks",
      slug: "relative-ranks",
      difficulty: "Easy",
    },
    {
      id: 1903,
      leetcodeId: 2558,
      title: "Take Gifts From the Richest Pile",
      slug: "take-gifts-from-the-richest-pile",
      difficulty: "Easy",
    },
    {
      id: 1904,
      leetcodeId: 3065,
      title: "Minimum Operations to Exceed Threshold Value I",
      slug: "minimum-operations-to-exceed-threshold-value-i",
      difficulty: "Easy",
    },
    {
      id: 1905,
      leetcodeId: 703,
      title: "Kth Largest Element in a Stream",
      slug: "kth-largest-element-in-a-stream",
      difficulty: "Easy",
    },
  ],
  [
    {
      id: 2001,
      leetcodeId: 1791,
      title: "Find Center of Star Graph",
      slug: "find-center-of-star-graph",
      difficulty: "Easy",
    },
    {
      id: 2002,
      leetcodeId: 1971,
      title: "Find if Path Exists in Graph",
      slug: "find-if-path-exists-in-graph",
      difficulty: "Easy",
    },
    {
      id: 2003,
      leetcodeId: 997,
      title: "Find the Town Judge",
      slug: "find-the-town-judge",
      difficulty: "Easy",
    },
    {
      id: 2004,
      leetcodeId: 1436,
      title: "Destination City",
      slug: "destination-city",
      difficulty: "Easy",
    },
    {
      id: 2005,
      leetcodeId: 2374,
      title: "Node With Highest Edge Score",
      slug: "node-with-highest-edge-score",
      difficulty: "Easy",
    },
  ],
];

const algorithmsQuestions = [[]];

export default function LearnDsa() {
  const [mode, setMode] = useState("data");
  const [openSection, setOpenSection] = useState(-1);

  const display =
    mode === "data" ? dataStructuresQuestions : algorithmsQuestions;

  const titles = mode === "data" ? dataStructureTitles : algorithmTitles;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 bg-zinc-950 rounded-2xl border border-mist-700 ">
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Learn DSA</h1>

        <p className="mt-2 text-gray-400 text-lg ">
          Learn Data Structures and Algorithms topic by topic.
        </p>
      </div>

      {/* Toggle */}

      <div className="mb-8 flex px-4 py-3 gap-3 rounded-xl border border-mist-700 bg-mist-900 p-1">
        <button
          onClick={() => {
            setMode("data");
            setOpenSection(-1);
          }}
          className={`flex items-center gap-2 rounded-lg border border-mist-700 px-5 py-2 text-base transition-all ${
            mode === "data"
              ? "bg-amber-500 font-semibold text-black"
              : "text-gray-300 hover:bg-mist-800"
          }`}
        >
          <Database size={20} strokeWidth={2.2} />
          <span>Data Structures</span>
        </button>

        <button
          onClick={() => {
            setMode("algorithm");
            setOpenSection(-1);
          }}
          className={`flex items-center gap-2 rounded-lg border border-mist-700 px-5 py-2 text-base transition-all ${
            mode === "algorithm"
              ? "bg-amber-500 font-semibold text-black"
              : "text-gray-300 hover:bg-mist-800"
          }`}
        >
          <BrainCircuit size={20} strokeWidth={2.2} />
          <span>Algorithms</span>
        </button>
      </div>

      {/* Accordion */}

      <div className="space-y-3 ">
        {display.map((questions, index) => {
          const isOpen = openSection === index;

          return (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-mist-700 bg-mist-900"
            >
              {/* Header */}

              <button
                onClick={() => setOpenSection(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between px-6 py-5 transition hover:bg-mist-800"
              >
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-white">
                    {titles[index]}
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {questions.length} Questions
                  </p>
                </div>

                {isOpen ? (
                  <ChevronDown size={22} className="text-gray-400" />
                ) : (
                  <ChevronRight size={22} className="text-gray-400" />
                )}
              </button>

              {/* Question List */}

              {isOpen && (
                <div className="space-y-3 border-t border-mist-700 p-4">
                  {questions.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border border-mist-700 bg-mist-900 px-5 py-2 transition hover:border-mist-500 "
                    >
                      {/* Left */}
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-amber-500 cursor-pointer"
                        />

                        <span className="w-8 text-sm font-semibold text-gray-500">
                          {index + 1}.
                        </span>

                        <div>
                          <h2 className="font-medium text-xl text-white">
                            {item.title}
                          </h2>

                          <div className=" flex items-center gap-3 text-sm text-gray-400">
                            <span>#{item.leetcodeId}</span>

                            <span>•</span>

                            <span>{item.topic}</span>

                            <span>•</span>

                            {item.solved ? (
                              <span className="text-green-400">✓ Solved</span>
                            ) : (
                              <span className="text-gray-500">Unsolved</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex items-center gap-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            item.difficulty === "Easy"
                              ? "bg-green-500/20 text-green-400"
                              : item.difficulty === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {item.difficulty}
                        </span>

                        <a
                          href={`https://leetcode.com/problems/${item.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg text-sm bg-amber-500 px-4 py-2 font-medium text-black transition hover:bg-amber-400"
                        >
                          Solve
                        </a>

                        <button className="flex items-center gap-2 rounded-lg border border-mist-700 bg-mist-800 px-4 py-2 text-base text-white transition hover:bg-mist-700">
                          Add Notes
                          <NotebookPen size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
