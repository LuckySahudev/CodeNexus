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
  "Basic Sorting",
  "Cycle Sort",
  "Quick Sort",
  "Merge Sort",
  "Slow Fast Pointer",
  "Dummy Node",
  "Monotonic Stack",
  "Binary Tree",
  "Binary Search Tree",
  "DFS Tree",
  "BFS Tree",
  "Kth Element Problems",
  "Bit Manipulation",
  "Dynamic Programming 1 ( 1D DP )",
  "DP 2 ( 2D DP )",
  "DP 3 ( Subsequence )",
  "DP 4 ( Knapsack )",
  "Backtracking"
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

const algorithmsQuestions = [
  [
    {
      id: 3001,
      leetcodeId: 1920,
      title: "Build Array from Permutation",
      slug: "build-array-from-permutation",
      difficulty: "Easy",
    },
    {
      id: 3002,
      leetcodeId: 1480,
      title: "Running Sum of 1d Array",
      slug: "running-sum-of-1d-array",
      difficulty: "Easy",
    },
    {
      id: 3003,
      leetcodeId: 485,
      title: "Max Consecutive Ones",
      slug: "max-consecutive-ones",
      difficulty: "Easy",
    },
    {
      id: 3004,
      leetcodeId: 1295,
      title: "Find Numbers with Even Number of Digits",
      slug: "find-numbers-with-even-number-of-digits",
      difficulty: "Easy",
    },
    {
      id: 3005,
      leetcodeId: 27,
      title: "Remove Element",
      slug: "remove-element",
      difficulty: "Easy",
    },
    {
      id: 3006,
      leetcodeId: 169,
      title: "Majority Element",
      slug: "majority-element",
      difficulty: "Easy",
    },
    {
      id: 3007,
      leetcodeId: 228,
      title: "Summary Ranges",
      slug: "summary-ranges",
      difficulty: "Easy",
    },
    {
      id: 3008,
      leetcodeId: 2148,
      title: "Count Elements With Strictly Smaller and Greater Elements",
      slug: "count-elements-with-strictly-smaller-and-greater-elements",
      difficulty: "Easy",
    },
    {
      id: 3009,
      leetcodeId: 289,
      title: "Game of Life",
      slug: "game-of-life",
      difficulty: "Medium",
    },
    {
      id: 3010,
      leetcodeId: 1822,
      title: "Sign of the Product of an Array",
      slug: "sign-of-the-product-of-an-array",
      difficulty: "Easy",
    },
  ],

  [
    {
      id: 3101,
      leetcodeId: 704,
      title: "Binary Search",
      slug: "binary-search",
      difficulty: "Easy",
    },
    {
      id: 3102,
      leetcodeId: 35,
      title: "Search Insert Position",
      slug: "search-insert-position",
      difficulty: "Easy",
    },
    {
      id: 3103,
      leetcodeId: 278,
      title: "First Bad Version",
      slug: "first-bad-version",
      difficulty: "Easy",
    },
    {
      id: 3104,
      leetcodeId: 374,
      title: "Guess Number Higher or Lower",
      slug: "guess-number-higher-or-lower",
      difficulty: "Easy",
    },
    {
      id: 3105,
      leetcodeId: 33,
      title: "Search in Rotated Sorted Array",
      slug: "search-in-rotated-sorted-array",
      difficulty: "Medium",
    },
    {
      id: 3106,
      leetcodeId: 34,
      title: "Find First and Last Position of Element in Sorted Array",
      slug: "find-first-and-last-position-of-element-in-sorted-array",
      difficulty: "Medium",
    },
    {
      id: 3107,
      leetcodeId: 74,
      title: "Search a 2D Matrix",
      slug: "search-a-2d-matrix",
      difficulty: "Medium",
    },
    {
      id: 3108,
      leetcodeId: 153,
      title: "Find Minimum in Rotated Sorted Array",
      slug: "find-minimum-in-rotated-sorted-array",
      difficulty: "Medium",
    },
    {
      id: 3109,
      leetcodeId: 875,
      title: "Koko Eating Bananas",
      slug: "koko-eating-bananas",
      difficulty: "Medium",
    },
    {
      id: 3110,
      leetcodeId: 1011,
      title: "Capacity To Ship Packages Within D Days",
      slug: "capacity-to-ship-packages-within-d-days",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 3201,
      leetcodeId: 125,
      title: "Valid Palindrome",
      slug: "valid-palindrome",
      difficulty: "Easy",
    },
    {
      id: 3202,
      leetcodeId: 344,
      title: "Reverse String",
      slug: "reverse-string",
      difficulty: "Easy",
    },
    {
      id: 3203,
      leetcodeId: 392,
      title: "Is Subsequence",
      slug: "is-subsequence",
      difficulty: "Easy",
    },
    {
      id: 3204,
      leetcodeId: 167,
      title: "Two Sum II - Input Array Is Sorted",
      slug: "two-sum-ii-input-array-is-sorted",
      difficulty: "Medium",
    },
    {
      id: 3205,
      leetcodeId: 11,
      title: "Container With Most Water",
      slug: "container-with-most-water",
      difficulty: "Medium",
    },
    {
      id: 3206,
      leetcodeId: 15,
      title: "3Sum",
      slug: "3sum",
      difficulty: "Medium",
    },
    {
      id: 3207,
      leetcodeId: 18,
      title: "4Sum",
      slug: "4sum",
      difficulty: "Medium",
    },
    {
      id: 3208,
      leetcodeId: 42,
      title: "Trapping Rain Water",
      slug: "trapping-rain-water",
      difficulty: "Hard",
    },
    {
      id: 3209,
      leetcodeId: 881,
      title: "Boats to Save People",
      slug: "boats-to-save-people",
      difficulty: "Medium",
    },
    {
      id: 3210,
      leetcodeId: 26,
      title: "Remove Duplicates from Sorted Array",
      slug: "remove-duplicates-from-sorted-array",
      difficulty: "Easy",
    },
  ],

  [
    {
      id: 3301,
      leetcodeId: 643,
      title: "Maximum Average Subarray I",
      slug: "maximum-average-subarray-i",
      difficulty: "Easy",
    },
    {
      id: 3302,
      leetcodeId: 1456,
      title: "Maximum Number of Vowels in a Substring of Given Length",
      slug: "maximum-number-of-vowels-in-a-substring-of-given-length",
      difficulty: "Medium",
    },
    {
      id: 3303,
      leetcodeId: 3,
      title: "Longest Substring Without Repeating Characters",
      slug: "longest-substring-without-repeating-characters",
      difficulty: "Medium",
    },
    {
      id: 3304,
      leetcodeId: 567,
      title: "Permutation in String",
      slug: "permutation-in-string",
      difficulty: "Medium",
    },
    {
      id: 3305,
      leetcodeId: 438,
      title: "Find All Anagrams in a String",
      slug: "find-all-anagrams-in-a-string",
      difficulty: "Medium",
    },
    {
      id: 3306,
      leetcodeId: 209,
      title: "Minimum Size Subarray Sum",
      slug: "minimum-size-subarray-sum",
      difficulty: "Medium",
    },
    {
      id: 3307,
      leetcodeId: 1004,
      title: "Max Consecutive Ones III",
      slug: "max-consecutive-ones-iii",
      difficulty: "Medium",
    },
    {
      id: 3308,
      leetcodeId: 904,
      title: "Fruit Into Baskets",
      slug: "fruit-into-baskets",
      difficulty: "Medium",
    },
    {
      id: 3309,
      leetcodeId: 424,
      title: "Longest Repeating Character Replacement",
      slug: "longest-repeating-character-replacement",
      difficulty: "Medium",
    },
    {
      id: 3310,
      leetcodeId: 239,
      title: "Sliding Window Maximum",
      slug: "sliding-window-maximum",
      difficulty: "Hard",
    },
  ],

  [
    {
      id: 3401,
      leetcodeId: 1480,
      title: "Running Sum of 1d Array",
      slug: "running-sum-of-1d-array",
      difficulty: "Easy",
    },
    {
      id: 3402,
      leetcodeId: 303,
      title: "Range Sum Query - Immutable",
      slug: "range-sum-query-immutable",
      difficulty: "Easy",
    },
    {
      id: 3403,
      leetcodeId: 724,
      title: "Find Pivot Index",
      slug: "find-pivot-index",
      difficulty: "Easy",
    },
    {
      id: 3404,
      leetcodeId: 238,
      title: "Product of Array Except Self",
      slug: "product-of-array-except-self",
      difficulty: "Medium",
    },
    {
      id: 3405,
      leetcodeId: 560,
      title: "Subarray Sum Equals K",
      slug: "subarray-sum-equals-k",
      difficulty: "Medium",
    },
    {
      id: 3406,
      leetcodeId: 525,
      title: "Contiguous Array",
      slug: "contiguous-array",
      difficulty: "Medium",
    },
    {
      id: 3407,
      leetcodeId: 974,
      title: "Subarray Sums Divisible by K",
      slug: "subarray-sums-divisible-by-k",
      difficulty: "Medium",
    },
    {
      id: 3408,
      leetcodeId: 304,
      title: "Range Sum Query 2D - Immutable",
      slug: "range-sum-query-2d-immutable",
      difficulty: "Medium",
    },
    {
      id: 3409,
      leetcodeId: 1314,
      title: "Matrix Block Sum",
      slug: "matrix-block-sum",
      difficulty: "Medium",
    },
    {
      id: 3410,
      leetcodeId: 930,
      title: "Binary Subarrays With Sum",
      slug: "binary-subarrays-with-sum",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 3501,
      leetcodeId: 912,
      title: "Sort an Array",
      slug: "sort-an-array",
      difficulty: "Medium",
    },
    {
      id: 3502,
      leetcodeId: 75,
      title: "Sort Colors",
      slug: "sort-colors",
      difficulty: "Medium",
    },
    {
      id: 3503,
      leetcodeId: 1122,
      title: "Relative Sort Array",
      slug: "relative-sort-array",
      difficulty: "Easy",
    },
    {
      id: 3504,
      leetcodeId: 2418,
      title: "Sort the People",
      slug: "sort-the-people",
      difficulty: "Easy",
    },
    {
      id: 3505,
      leetcodeId: 905,
      title: "Sort Array By Parity",
      slug: "sort-array-by-parity",
      difficulty: "Easy",
    },
    {
      id: 3506,
      leetcodeId: 922,
      title: "Sort Array By Parity II",
      slug: "sort-array-by-parity-ii",
      difficulty: "Easy",
    },
    {
      id: 3507,
      leetcodeId: 147,
      title: "Insertion Sort List",
      slug: "insertion-sort-list",
      difficulty: "Medium",
    },
    {
      id: 3508,
      leetcodeId: 148,
      title: "Sort List",
      slug: "sort-list",
      difficulty: "Medium",
    },
    {
      id: 3509,
      leetcodeId: 969,
      title: "Pancake Sorting",
      slug: "pancake-sorting",
      difficulty: "Medium",
    },
    {
      id: 3510,
      leetcodeId: 280,
      title: "Wiggle Sort",
      slug: "wiggle-sort",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 3801,
      leetcodeId: 268,
      title: "Missing Number",
      slug: "missing-number",
      difficulty: "Easy",
    },
    {
      id: 3802,
      leetcodeId: 448,
      title: "Find All Numbers Disappeared in an Array",
      slug: "find-all-numbers-disappeared-in-an-array",
      difficulty: "Easy",
    },
    {
      id: 3803,
      leetcodeId: 645,
      title: "Set Mismatch",
      slug: "set-mismatch",
      difficulty: "Easy",
    },
    {
      id: 3804,
      leetcodeId: 287,
      title: "Find the Duplicate Number",
      slug: "find-the-duplicate-number",
      difficulty: "Medium",
    },
    {
      id: 3805,
      leetcodeId: 442,
      title: "Find All Duplicates in an Array",
      slug: "find-all-duplicates-in-an-array",
      difficulty: "Medium",
    },
    {
      id: 3806,
      leetcodeId: 41,
      title: "First Missing Positive",
      slug: "first-missing-positive",
      difficulty: "Hard",
    },
    {
      id: 3807,
      leetcodeId: 163,
      title: "Missing Ranges",
      slug: "missing-ranges",
      difficulty: "Easy",
    },
    {
      id: 3808,
      leetcodeId: 1060,
      title: "Missing Element in Sorted Array",
      slug: "missing-element-in-sorted-array",
      difficulty: "Medium",
    },
    {
      id: 3809,
      leetcodeId: 1539,
      title: "Kth Missing Positive Number",
      slug: "kth-missing-positive-number",
      difficulty: "Easy",
    },
    {
      id: 3810,
      leetcodeId: 2965,
      title: "Find Missing and Repeated Values",
      slug: "find-missing-and-repeated-values",
      difficulty: "Easy",
    },
  ],

  [
    {
      id: 3901,
      leetcodeId: 912,
      title: "Sort an Array",
      slug: "sort-an-array",
      difficulty: "Medium",
    },
    {
      id: 3902,
      leetcodeId: 75,
      title: "Sort Colors",
      slug: "sort-colors",
      difficulty: "Medium",
    },
    {
      id: 3903,
      leetcodeId: 215,
      title: "Kth Largest Element in an Array",
      slug: "kth-largest-element-in-an-array",
      difficulty: "Medium",
    },
    {
      id: 3904,
      leetcodeId: 973,
      title: "K Closest Points to Origin",
      slug: "k-closest-points-to-origin",
      difficulty: "Medium",
    },
    {
      id: 3905,
      leetcodeId: 2161,
      title: "Partition Array According to Given Pivot",
      slug: "partition-array-according-to-given-pivot",
      difficulty: "Medium",
    },
    {
      id: 3906,
      leetcodeId: 324,
      title: "Wiggle Sort II",
      slug: "wiggle-sort-ii",
      difficulty: "Medium",
    },
    {
      id: 3907,
      leetcodeId: 347,
      title: "Top K Frequent Elements",
      slug: "top-k-frequent-elements",
      difficulty: "Medium",
    },
    {
      id: 3908,
      leetcodeId: 658,
      title: "Find K Closest Elements",
      slug: "find-k-closest-elements",
      difficulty: "Medium",
    },
    {
      id: 3909,
      leetcodeId: 280,
      title: "Wiggle Sort",
      slug: "wiggle-sort",
      difficulty: "Medium",
    },
    {
      id: 3910,
      leetcodeId: 179,
      title: "Largest Number",
      slug: "largest-number",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 4001,
      leetcodeId: 912,
      title: "Sort an Array",
      slug: "sort-an-array",
      difficulty: "Medium",
    },
    {
      id: 4002,
      leetcodeId: 88,
      title: "Merge Sorted Array",
      slug: "merge-sorted-array",
      difficulty: "Easy",
    },
    {
      id: 4003,
      leetcodeId: 21,
      title: "Merge Two Sorted Lists",
      slug: "merge-two-sorted-lists",
      difficulty: "Easy",
    },
    {
      id: 4004,
      leetcodeId: 23,
      title: "Merge k Sorted Lists",
      slug: "merge-k-sorted-lists",
      difficulty: "Hard",
    },
    {
      id: 4005,
      leetcodeId: 148,
      title: "Sort List",
      slug: "sort-list",
      difficulty: "Medium",
    },
    {
      id: 4006,
      leetcodeId: 56,
      title: "Merge Intervals",
      slug: "merge-intervals",
      difficulty: "Medium",
    },
    {
      id: 4007,
      leetcodeId: 493,
      title: "Reverse Pairs",
      slug: "reverse-pairs",
      difficulty: "Hard",
    },
    {
      id: 4008,
      leetcodeId: 315,
      title: "Count of Smaller Numbers After Self",
      slug: "count-of-smaller-numbers-after-self",
      difficulty: "Hard",
    },
    {
      id: 4009,
      leetcodeId: 327,
      title: "Count of Range Sum",
      slug: "count-of-range-sum",
      difficulty: "Hard",
    },
    {
      id: 4010,
      leetcodeId: 1649,
      title: "Create Sorted Array through Instructions",
      slug: "create-sorted-array-through-instructions",
      difficulty: "Hard",
    },
  ],

  [
    {
      id: 4101,
      leetcodeId: 876,
      title: "Middle of the Linked List",
      slug: "middle-of-the-linked-list",
      difficulty: "Easy",
    },
    {
      id: 4102,
      leetcodeId: 141,
      title: "Linked List Cycle",
      slug: "linked-list-cycle",
      difficulty: "Easy",
    },
    {
      id: 4103,
      leetcodeId: 142,
      title: "Linked List Cycle II",
      slug: "linked-list-cycle-ii",
      difficulty: "Medium",
    },
    {
      id: 4104,
      leetcodeId: 234,
      title: "Palindrome Linked List",
      slug: "palindrome-linked-list",
      difficulty: "Easy",
    },
    {
      id: 4105,
      leetcodeId: 287,
      title: "Find the Duplicate Number",
      slug: "find-the-duplicate-number",
      difficulty: "Medium",
    },
    {
      id: 4106,
      leetcodeId: 202,
      title: "Happy Number",
      slug: "happy-number",
      difficulty: "Easy",
    },
    {
      id: 4107,
      leetcodeId: 143,
      title: "Reorder List",
      slug: "reorder-list",
      difficulty: "Medium",
    },
    {
      id: 4108,
      leetcodeId: 19,
      title: "Remove Nth Node From End of List",
      slug: "remove-nth-node-from-end-of-list",
      difficulty: "Medium",
    },
    {
      id: 4109,
      leetcodeId: 61,
      title: "Rotate List",
      slug: "rotate-list",
      difficulty: "Medium",
    },
    {
      id: 4110,
      leetcodeId: 2130,
      title: "Maximum Twin Sum of a Linked List",
      slug: "maximum-twin-sum-of-a-linked-list",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 4201,
      leetcodeId: 21,
      title: "Merge Two Sorted Lists",
      slug: "merge-two-sorted-lists",
      difficulty: "Easy",
    },
    {
      id: 4202,
      leetcodeId: 203,
      title: "Remove Linked List Elements",
      slug: "remove-linked-list-elements",
      difficulty: "Easy",
    },
    {
      id: 4203,
      leetcodeId: 83,
      title: "Remove Duplicates from Sorted List",
      slug: "remove-duplicates-from-sorted-list",
      difficulty: "Easy",
    },
    {
      id: 4204,
      leetcodeId: 82,
      title: "Remove Duplicates from Sorted List II",
      slug: "remove-duplicates-from-sorted-list-ii",
      difficulty: "Medium",
    },
    {
      id: 4205,
      leetcodeId: 86,
      title: "Partition List",
      slug: "partition-list",
      difficulty: "Medium",
    },
    {
      id: 4206,
      leetcodeId: 24,
      title: "Swap Nodes in Pairs",
      slug: "swap-nodes-in-pairs",
      difficulty: "Medium",
    },
    {
      id: 4207,
      leetcodeId: 92,
      title: "Reverse Linked List II",
      slug: "reverse-linked-list-ii",
      difficulty: "Medium",
    },
    {
      id: 4208,
      leetcodeId: 25,
      title: "Reverse Nodes in k-Group",
      slug: "reverse-nodes-in-k-group",
      difficulty: "Hard",
    },
    {
      id: 4209,
      leetcodeId: 328,
      title: "Odd Even Linked List",
      slug: "odd-even-linked-list",
      difficulty: "Medium",
    },
    {
      id: 4210,
      leetcodeId: 1721,
      title: "Swapping Nodes in a Linked List",
      slug: "swapping-nodes-in-a-linked-list",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 4301,
      leetcodeId: 496,
      title: "Next Greater Element I",
      slug: "next-greater-element-i",
      difficulty: "Easy",
    },
    {
      id: 4302,
      leetcodeId: 503,
      title: "Next Greater Element II",
      slug: "next-greater-element-ii",
      difficulty: "Medium",
    },
    {
      id: 4303,
      leetcodeId: 739,
      title: "Daily Temperatures",
      slug: "daily-temperatures",
      difficulty: "Medium",
    },
    {
      id: 4304,
      leetcodeId: 901,
      title: "Online Stock Span",
      slug: "online-stock-span",
      difficulty: "Medium",
    },
    {
      id: 4305,
      leetcodeId: 84,
      title: "Largest Rectangle in Histogram",
      slug: "largest-rectangle-in-histogram",
      difficulty: "Hard",
    },
    {
      id: 4306,
      leetcodeId: 85,
      title: "Maximal Rectangle",
      slug: "maximal-rectangle",
      difficulty: "Hard",
    },
    {
      id: 4307,
      leetcodeId: 907,
      title: "Sum of Subarray Minimums",
      slug: "sum-of-subarray-minimums",
      difficulty: "Medium",
    },
    {
      id: 4308,
      leetcodeId: 2104,
      title: "Sum of Subarray Ranges",
      slug: "sum-of-subarray-ranges",
      difficulty: "Medium",
    },
    {
      id: 4309,
      leetcodeId: 1944,
      title: "Number of Visible People in a Queue",
      slug: "number-of-visible-people-in-a-queue",
      difficulty: "Hard",
    },
    {
      id: 4310,
      leetcodeId: 1475,
      title: "Final Prices With a Special Discount in a Shop",
      slug: "final-prices-with-a-special-discount-in-a-shop",
      difficulty: "Easy",
    },
  ],

  [
    {
      id: 4401,
      leetcodeId: 104,
      title: "Maximum Depth of Binary Tree",
      slug: "maximum-depth-of-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 4402,
      leetcodeId: 100,
      title: "Same Tree",
      slug: "same-tree",
      difficulty: "Easy",
    },
    {
      id: 4403,
      leetcodeId: 101,
      title: "Symmetric Tree",
      slug: "symmetric-tree",
      difficulty: "Easy",
    },
    {
      id: 4404,
      leetcodeId: 226,
      title: "Invert Binary Tree",
      slug: "invert-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 4405,
      leetcodeId: 112,
      title: "Path Sum",
      slug: "path-sum",
      difficulty: "Easy",
    },
    {
      id: 4406,
      leetcodeId: 257,
      title: "Binary Tree Paths",
      slug: "binary-tree-paths",
      difficulty: "Easy",
    },
    {
      id: 4407,
      leetcodeId: 111,
      title: "Minimum Depth of Binary Tree",
      slug: "minimum-depth-of-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 4408,
      leetcodeId: 110,
      title: "Balanced Binary Tree",
      slug: "balanced-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 4409,
      leetcodeId: 543,
      title: "Diameter of Binary Tree",
      slug: "diameter-of-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 4410,
      leetcodeId: 129,
      title: "Sum Root to Leaf Numbers",
      slug: "sum-root-to-leaf-numbers",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 4501,
      leetcodeId: 700,
      title: "Search in a Binary Search Tree",
      slug: "search-in-a-binary-search-tree",
      difficulty: "Easy",
    },
    {
      id: 4502,
      leetcodeId: 701,
      title: "Insert into a Binary Search Tree",
      slug: "insert-into-a-binary-search-tree",
      difficulty: "Medium",
    },
    {
      id: 4503,
      leetcodeId: 98,
      title: "Validate Binary Search Tree",
      slug: "validate-binary-search-tree",
      difficulty: "Medium",
    },
    {
      id: 4504,
      leetcodeId: 530,
      title: "Minimum Absolute Difference in BST",
      slug: "minimum-absolute-difference-in-bst",
      difficulty: "Easy",
    },
    {
      id: 4505,
      leetcodeId: 235,
      title: "Lowest Common Ancestor of a Binary Search Tree",
      slug: "lowest-common-ancestor-of-a-binary-search-tree",
      difficulty: "Medium",
    },
    {
      id: 4506,
      leetcodeId: 230,
      title: "Kth Smallest Element in a BST",
      slug: "kth-smallest-element-in-a-bst",
      difficulty: "Medium",
    },
    {
      id: 4507,
      leetcodeId: 173,
      title: "Binary Search Tree Iterator",
      slug: "binary-search-tree-iterator",
      difficulty: "Medium",
    },
    {
      id: 4508,
      leetcodeId: 450,
      title: "Delete Node in a BST",
      slug: "delete-node-in-a-bst",
      difficulty: "Medium",
    },
    {
      id: 4509,
      leetcodeId: 669,
      title: "Trim a Binary Search Tree",
      slug: "trim-a-binary-search-tree",
      difficulty: "Medium",
    },
    {
      id: 4510,
      leetcodeId: 538,
      title: "Convert BST to Greater Tree",
      slug: "convert-bst-to-greater-tree",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 4701,
      leetcodeId: 104,
      title: "Maximum Depth of Binary Tree",
      slug: "maximum-depth-of-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 4702,
      leetcodeId: 112,
      title: "Path Sum",
      slug: "path-sum",
      difficulty: "Easy",
    },
    {
      id: 4703,
      leetcodeId: 257,
      title: "Binary Tree Paths",
      slug: "binary-tree-paths",
      difficulty: "Easy",
    },
    {
      id: 4704,
      leetcodeId: 543,
      title: "Diameter of Binary Tree",
      slug: "diameter-of-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 4705,
      leetcodeId: 129,
      title: "Sum Root to Leaf Numbers",
      slug: "sum-root-to-leaf-numbers",
      difficulty: "Medium",
    },
    {
      id: 4706,
      leetcodeId: 113,
      title: "Path Sum II",
      slug: "path-sum-ii",
      difficulty: "Medium",
    },
    {
      id: 4707,
      leetcodeId: 124,
      title: "Binary Tree Maximum Path Sum",
      slug: "binary-tree-maximum-path-sum",
      difficulty: "Hard",
    },
    {
      id: 4708,
      leetcodeId: 437,
      title: "Path Sum III",
      slug: "path-sum-iii",
      difficulty: "Medium",
    },
    {
      id: 4709,
      leetcodeId: 236,
      title: "Lowest Common Ancestor of a Binary Tree",
      slug: "lowest-common-ancestor-of-a-binary-tree",
      difficulty: "Medium",
    },
    {
      id: 4710,
      leetcodeId: 814,
      title: "Binary Tree Pruning",
      slug: "binary-tree-pruning",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 4801,
      leetcodeId: 102,
      title: "Binary Tree Level Order Traversal",
      slug: "binary-tree-level-order-traversal",
      difficulty: "Medium",
    },
    {
      id: 4802,
      leetcodeId: 107,
      title: "Binary Tree Level Order Traversal II",
      slug: "binary-tree-level-order-traversal-ii",
      difficulty: "Medium",
    },
    {
      id: 4803,
      leetcodeId: 637,
      title: "Average of Levels in Binary Tree",
      slug: "average-of-levels-in-binary-tree",
      difficulty: "Easy",
    },
    {
      id: 4804,
      leetcodeId: 199,
      title: "Binary Tree Right Side View",
      slug: "binary-tree-right-side-view",
      difficulty: "Medium",
    },
    {
      id: 4805,
      leetcodeId: 515,
      title: "Find Largest Value in Each Tree Row",
      slug: "find-largest-value-in-each-tree-row",
      difficulty: "Medium",
    },
    {
      id: 4806,
      leetcodeId: 103,
      title: "Binary Tree Zigzag Level Order Traversal",
      slug: "binary-tree-zigzag-level-order-traversal",
      difficulty: "Medium",
    },
    {
      id: 4807,
      leetcodeId: 513,
      title: "Find Bottom Left Tree Value",
      slug: "find-bottom-left-tree-value",
      difficulty: "Medium",
    },
    {
      id: 4808,
      leetcodeId: 1161,
      title: "Maximum Level Sum of a Binary Tree",
      slug: "maximum-level-sum-of-a-binary-tree",
      difficulty: "Medium",
    },
    {
      id: 4809,
      leetcodeId: 958,
      title: "Check Completeness of a Binary Tree",
      slug: "check-completeness-of-a-binary-tree",
      difficulty: "Medium",
    },
    {
      id: 4810,
      leetcodeId: 1609,
      title: "Even Odd Tree",
      slug: "even-odd-tree",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 4901,
      leetcodeId: 215,
      title: "Kth Largest Element in an Array",
      slug: "kth-largest-element-in-an-array",
      difficulty: "Medium",
    },
    {
      id: 4902,
      leetcodeId: 347,
      title: "Top K Frequent Elements",
      slug: "top-k-frequent-elements",
      difficulty: "Medium",
    },
    {
      id: 4903,
      leetcodeId: 703,
      title: "Kth Largest Element in a Stream",
      slug: "kth-largest-element-in-a-stream",
      difficulty: "Easy",
    },
    {
      id: 4904,
      leetcodeId: 378,
      title: "Kth Smallest Element in a Sorted Matrix",
      slug: "kth-smallest-element-in-a-sorted-matrix",
      difficulty: "Medium",
    },
    {
      id: 4905,
      leetcodeId: 230,
      title: "Kth Smallest Element in a BST",
      slug: "kth-smallest-element-in-a-bst",
      difficulty: "Medium",
    },
    {
      id: 4906,
      leetcodeId: 973,
      title: "K Closest Points to Origin",
      slug: "k-closest-points-to-origin",
      difficulty: "Medium",
    },
    {
      id: 4907,
      leetcodeId: 658,
      title: "Find K Closest Elements",
      slug: "find-k-closest-elements",
      difficulty: "Medium",
    },
    {
      id: 4908,
      leetcodeId: 692,
      title: "Top K Frequent Words",
      slug: "top-k-frequent-words",
      difficulty: "Medium",
    },
    {
      id: 4909,
      leetcodeId: 786,
      title: "K-th Smallest Prime Fraction",
      slug: "k-th-smallest-prime-fraction",
      difficulty: "Medium",
    },
    {
      id: 4910,
      leetcodeId: 373,
      title: "Find K Pairs with Smallest Sums",
      slug: "find-k-pairs-with-smallest-sums",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 5001,
      leetcodeId: 136,
      title: "Single Number",
      slug: "single-number",
      difficulty: "Easy",
    },
    {
      id: 5002,
      leetcodeId: 191,
      title: "Number of 1 Bits",
      slug: "number-of-1-bits",
      difficulty: "Easy",
    },
    {
      id: 5003,
      leetcodeId: 338,
      title: "Counting Bits",
      slug: "counting-bits",
      difficulty: "Easy",
    },
    {
      id: 5004,
      leetcodeId: 231,
      title: "Power of Two",
      slug: "power-of-two",
      difficulty: "Easy",
    },
    {
      id: 5005,
      leetcodeId: 190,
      title: "Reverse Bits",
      slug: "reverse-bits",
      difficulty: "Easy",
    },
    {
      id: 5006,
      leetcodeId: 137,
      title: "Single Number II",
      slug: "single-number-ii",
      difficulty: "Medium",
    },
    {
      id: 5007,
      leetcodeId: 260,
      title: "Single Number III",
      slug: "single-number-iii",
      difficulty: "Medium",
    },
    {
      id: 5008,
      leetcodeId: 268,
      title: "Missing Number",
      slug: "missing-number",
      difficulty: "Easy",
    },
    {
      id: 5009,
      leetcodeId: 1318,
      title: "Minimum Flips to Make a OR b Equal to c",
      slug: "minimum-flips-to-make-a-or-b-equal-to-c",
      difficulty: "Medium",
    },
    {
      id: 5010,
      leetcodeId: 201,
      title: "Bitwise AND of Numbers Range",
      slug: "bitwise-and-of-numbers-range",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 5101,
      leetcodeId: 70,
      title: "Climbing Stairs",
      slug: "climbing-stairs",
      difficulty: "Easy",
    },
    {
      id: 5102,
      leetcodeId: 746,
      title: "Min Cost Climbing Stairs",
      slug: "min-cost-climbing-stairs",
      difficulty: "Easy",
    },
    {
      id: 5103,
      leetcodeId: 198,
      title: "House Robber",
      slug: "house-robber",
      difficulty: "Medium",
    },
    {
      id: 5104,
      leetcodeId: 213,
      title: "House Robber II",
      slug: "house-robber-ii",
      difficulty: "Medium",
    },
    {
      id: 5105,
      leetcodeId: 740,
      title: "Delete and Earn",
      slug: "delete-and-earn",
      difficulty: "Medium",
    },
    {
      id: 5106,
      leetcodeId: 300,
      title: "Longest Increasing Subsequence",
      slug: "longest-increasing-subsequence",
      difficulty: "Medium",
    },
    {
      id: 5107,
      leetcodeId: 139,
      title: "Word Break",
      slug: "word-break",
      difficulty: "Medium",
    },
    {
      id: 5108,
      leetcodeId: 91,
      title: "Decode Ways",
      slug: "decode-ways",
      difficulty: "Medium",
    },
    {
      id: 5109,
      leetcodeId: 322,
      title: "Coin Change",
      slug: "coin-change",
      difficulty: "Medium",
    },
    {
      id: 5110,
      leetcodeId: 279,
      title: "Perfect Squares",
      slug: "perfect-squares",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 5201,
      leetcodeId: 62,
      title: "Unique Paths",
      slug: "unique-paths",
      difficulty: "Medium",
    },
    {
      id: 5202,
      leetcodeId: 63,
      title: "Unique Paths II",
      slug: "unique-paths-ii",
      difficulty: "Medium",
    },
    {
      id: 5203,
      leetcodeId: 64,
      title: "Minimum Path Sum",
      slug: "minimum-path-sum",
      difficulty: "Medium",
    },
    {
      id: 5204,
      leetcodeId: 931,
      title: "Minimum Falling Path Sum",
      slug: "minimum-falling-path-sum",
      difficulty: "Medium",
    },
    {
      id: 5205,
      leetcodeId: 120,
      title: "Triangle",
      slug: "triangle",
      difficulty: "Medium",
    },
    {
      id: 5206,
      leetcodeId: 221,
      title: "Maximal Square",
      slug: "maximal-square",
      difficulty: "Medium",
    },
    {
      id: 5207,
      leetcodeId: 1143,
      title: "Longest Common Subsequence",
      slug: "longest-common-subsequence",
      difficulty: "Medium",
    },
    {
      id: 5208,
      leetcodeId: 72,
      title: "Edit Distance",
      slug: "edit-distance",
      difficulty: "Hard",
    },
    {
      id: 5209,
      leetcodeId: 97,
      title: "Interleaving String",
      slug: "interleaving-string",
      difficulty: "Medium",
    },
    {
      id: 5210,
      leetcodeId: 712,
      title: "Minimum ASCII Delete Sum for Two Strings",
      slug: "minimum-ascii-delete-sum-for-two-strings",
      difficulty: "Medium",
    },
  ],

  [
    {
      id: 5301,
      leetcodeId: 1143,
      title: "Longest Common Subsequence",
      slug: "longest-common-subsequence",
      difficulty: "Medium",
    },
    {
      id: 5302,
      leetcodeId: 516,
      title: "Longest Palindromic Subsequence",
      slug: "longest-palindromic-subsequence",
      difficulty: "Medium",
    },
    {
      id: 5303,
      leetcodeId: 115,
      title: "Distinct Subsequences",
      slug: "distinct-subsequences",
      difficulty: "Hard",
    },
    {
      id: 5304,
      leetcodeId: 583,
      title: "Delete Operation for Two Strings",
      slug: "delete-operation-for-two-strings",
      difficulty: "Medium",
    },
    {
      id: 5305,
      leetcodeId: 72,
      title: "Edit Distance",
      slug: "edit-distance",
      difficulty: "Hard",
    },
    {
      id: 5306,
      leetcodeId: 97,
      title: "Interleaving String",
      slug: "interleaving-string",
      difficulty: "Medium",
    },
    {
      id: 5307,
      leetcodeId: 1312,
      title: "Minimum Insertion Steps to Make a String Palindrome",
      slug: "minimum-insertion-steps-to-make-a-string-palindrome",
      difficulty: "Hard",
    },
    {
      id: 5308,
      leetcodeId: 712,
      title: "Minimum ASCII Delete Sum for Two Strings",
      slug: "minimum-ascii-delete-sum-for-two-strings",
      difficulty: "Medium",
    },
    {
      id: 5309,
      leetcodeId: 392,
      title: "Is Subsequence",
      slug: "is-subsequence",
      difficulty: "Easy",
    },
    {
      id: 5310,
      leetcodeId: 1092,
      title: "Shortest Common Supersequence",
      slug: "shortest-common-supersequence",
      difficulty: "Hard",
    },
  ],

  [
    {
      id: 5401,
      leetcodeId: 416,
      title: "Partition Equal Subset Sum",
      slug: "partition-equal-subset-sum",
      difficulty: "Medium",
    },
    {
      id: 5402,
      leetcodeId: 494,
      title: "Target Sum",
      slug: "target-sum",
      difficulty: "Medium",
    },
    {
      id: 5403,
      leetcodeId: 1049,
      title: "Last Stone Weight II",
      slug: "last-stone-weight-ii",
      difficulty: "Medium",
    },
    {
      id: 5404,
      leetcodeId: 474,
      title: "Ones and Zeroes",
      slug: "ones-and-zeroes",
      difficulty: "Medium",
    },
    {
      id: 5405,
      leetcodeId: 518,
      title: "Coin Change II",
      slug: "coin-change-ii",
      difficulty: "Medium",
    },
    {
      id: 5406,
      leetcodeId: 377,
      title: "Combination Sum IV",
      slug: "combination-sum-iv",
      difficulty: "Medium",
    },
    {
      id: 5407,
      leetcodeId: 279,
      title: "Perfect Squares",
      slug: "perfect-squares",
      difficulty: "Medium",
    },
    {
      id: 5408,
      leetcodeId: 322,
      title: "Coin Change",
      slug: "coin-change",
      difficulty: "Medium",
    },
    {
      id: 5409,
      leetcodeId: 879,
      title: "Profitable Schemes",
      slug: "profitable-schemes",
      difficulty: "Hard",
    },
    {
      id: 5410,
      leetcodeId: 1449,
      title: "Form Largest Integer With Digits That Add up to Target",
      slug: "form-largest-integer-with-digits-that-add-up-to-target",
      difficulty: "Hard",
    },
  ],

  [
    {
      id: 5501,
      leetcodeId: 78,
      title: "Subsets",
      slug: "subsets",
      difficulty: "Medium",
    },
    {
      id: 5502,
      leetcodeId: 90,
      title: "Subsets II",
      slug: "subsets-ii",
      difficulty: "Medium",
    },
    {
      id: 5503,
      leetcodeId: 46,
      title: "Permutations",
      slug: "permutations",
      difficulty: "Medium",
    },
    {
      id: 5504,
      leetcodeId: 47,
      title: "Permutations II",
      slug: "permutations-ii",
      difficulty: "Medium",
    },
    {
      id: 5505,
      leetcodeId: 39,
      title: "Combination Sum",
      slug: "combination-sum",
      difficulty: "Medium",
    },
    {
      id: 5506,
      leetcodeId: 40,
      title: "Combination Sum II",
      slug: "combination-sum-ii",
      difficulty: "Medium",
    },
    {
      id: 5507,
      leetcodeId: 131,
      title: "Palindrome Partitioning",
      slug: "palindrome-partitioning",
      difficulty: "Medium",
    },
    {
      id: 5508,
      leetcodeId: 17,
      title: "Letter Combinations of a Phone Number",
      slug: "letter-combinations-of-a-phone-number",
      difficulty: "Medium",
    },
    {
      id: 5509,
      leetcodeId: 51,
      title: "N-Queens",
      slug: "n-queens",
      difficulty: "Hard",
    },
    {
      id: 5510,
      leetcodeId: 79,
      title: "Word Search",
      slug: "word-search",
      difficulty: "Medium",
    },
  ],
];


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
