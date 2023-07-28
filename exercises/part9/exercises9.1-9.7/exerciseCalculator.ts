interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: number[], targetHour: number): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((h) => h !== 0).length;
  const average = exerciseHours.reduce((sum, current) => sum + current) / periodLength;
  const rating = average > targetHour ? 3 : targetHour - average < 0.5 ? 2 : 1;
  const ratingDescription = rating === 3 ? "Good job!" : rating === 2 ? "Close, but no cigar!" : "Try better next time!";
  const success = rating === 3 ? true : false;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHour,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));