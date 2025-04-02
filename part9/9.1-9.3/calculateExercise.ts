type Rating = 1 | 2 | 3;

interface Training {
  numberOfDays: number;
  numberOfTrainingDays: number;
  targetValue: number;
  calculatedAverageTime: number;
  targetReached: boolean;
  rating: Rating;
  ratingExplanation: string;
}

export const calculateExercise = (
  hours: number[],
  target: number
): Training => {
  const numberOfDays: number = hours.length;
  const trainingDays = hours.filter((day) => day !== 0);
  const average =
    hours.reduce((total, hour) => (total += hour), 0) / numberOfDays;
  const targetReached: boolean = average >= target;
  let ratingExplanation: string;
  let rating: Rating;

  if (average < target * 0.75) {
    rating = 1;
    ratingExplanation = "needs improvement";
  } else if (average < target) {
    rating = 2;
    ratingExplanation = "Not too bad";
  } else {
    rating = 3;
    ratingExplanation = "Doing great";
  }

  return {
    numberOfDays,
    numberOfTrainingDays: trainingDays.length,
    targetValue: target,
    calculatedAverageTime: average,
    targetReached,
    rating,
    ratingExplanation,
  };
};

const args = process.argv.slice(2).map(Number);

if (args.length < 2 || args.some(isNaN)) {
  throw new Error("provide some numbers");
}

const hoursArray = args.slice(0, -1);
const target = args[args.length - 1];

const result = calculateExercise(hoursArray, target);
console.log(result);
