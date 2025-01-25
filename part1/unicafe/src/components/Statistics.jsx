import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad, average, positive, all }) => {
  return all === 0 ? (
    <div>No feedback given</div>
  ) : (
    <div>
      <h1>statistics</h1>
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </div>
    </div>
  );
};

export default Statistics;
