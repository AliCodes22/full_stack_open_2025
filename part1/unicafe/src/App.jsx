import { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;

  const average = all > 0 ? (good - bad) / all : 0;

  const positive = all > 0 ? (good / all) * 100 : 0;

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button onClick={() => setGood(good + 1)} value="good" />
        <Button onClick={() => setNeutral(neutral + 1)} value="neutral" />
        <Button onClick={() => setBad(bad + 1)} value="bad" />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
}

export default App;
