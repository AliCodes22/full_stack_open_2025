import Part from "./Part";

const Content = ({ content }) => {
  console.log(content);
  const total = content.reduce((total, item) => {
    return (total += item.exercises);
  }, 0);

  return (
    <div>
      {content.map((item) => {
        return (
          <Part name={item.name} exercises={item.exercises} key={item.id} />
        );
      })}
      <p>Total of {total} exercises</p>
    </div>
  );
};

export default Content;
