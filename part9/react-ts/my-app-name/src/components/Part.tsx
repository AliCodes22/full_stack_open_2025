import { CoursePart } from "../App";

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>{" "}
          <br />
          {part.description}
        </p>
      );
    case "group":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>{" "}
          <br />
          <p>Project exercises {part.groupProjectCount}</p>
        </p>
      );
    case "background":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <p>{part.description}</p>
          <p>Submit to {part.backgroundMaterial}</p>
        </p>
      );
    case "special":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>{" "}
          <br />
          <p>{part.description}</p>
          <p>
            Required skills:{" "}
            {part.requirements.map((item: string) => (
              <span>
                {item === part.requirements[part.requirements.length - 1]
                  ? item
                  : `${item},   `}
              </span>
            ))}
          </p>
        </p>
      );
  }
};

export default Part;
