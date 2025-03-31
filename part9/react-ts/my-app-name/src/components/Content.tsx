import Part from "./Part";
import { CoursePart } from "../App";

interface PartsProps {
  parts: CoursePart[];
}

const Content = ({ parts }: PartsProps) => {
  return parts.map((part: CoursePart) => {
    return <Part part={part} />;
  });
};

export default Content;
