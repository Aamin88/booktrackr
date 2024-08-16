import {
  MdZoomOutMap,
  MdFilter1,
  MdOutlineTravelExplore,
} from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";

const data = [
  {
    icon: MdZoomOutMap,
    title: "Track Your Reads",
    desc: "Easily add of books you've read, complete with a short description of the book and can come back anytime to see your thoughts on the book were.",
  },
  {
    icon: MdFilter1,
    title: "Recommend Favorites",
    desc: "Add books you think others will love, making it simple for the community to discover new reads.",
  },
  {
    icon: MdOutlineTravelExplore,
    title: "Explore Suggestions",
    desc: " Browse recommendations from other readers to find books that align with your interests.",
  },
  {
    icon: CgDetailsMore,
    title: "Summary",
    desc: "See a summary of books added by chapters, highlighting the main concepts and key lessons of each chapter.",
  },
];

export { data };
