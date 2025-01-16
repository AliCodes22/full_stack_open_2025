import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => {
        return (
          <Part part={part.name} exercises={part.exercises} key={part.name} />
        );
      })}
    </div>
  );
};

export default Content;
