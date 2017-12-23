import { Problem } from "./models/problem.model";
export const PROBLEMS: Problem[] = [
    {
      id: 1,
      name: "Two Sum",
      desc: "Given an array of integers, find two sum that add up to a specified value.",
      difficulty: "easy"
    },
    {
      id: 2,
      name: "Three Sum",
      desc: "Given an array of integers, find three sums that add up to a specified value.",
      difficulty: "medium"
    },
    {
      id: 3,
      name: "4 Sum",
      desc: "Given an array of integers, find four sums that add up to a specified value.",
      difficulty: "medium"
    },
    {
      id: 4,
      name: "Triangle Count",
      desc: "Given an array of integers, how many three numbers can be found in this array",
      difficulty: "hard"
    },
    {
      id: 5,
      name: "Sliding Window Maximum",
      desc: "Given an array of n integers with duplicates, and a moving single window.",
      difficulty: "super"
    }
  ];