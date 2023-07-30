interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Hours {
  exerciseHours: number[],
  targetHour: number,
}

const parseArguments = (args: string[]): Hours => {
  if (args.length < 4) throw new Error('Not enough arguments!')

  if (!args.slice(3).map((a) => Number(a)).includes(NaN)) {
    return {
      targetHour: Number(args[2]),
      exerciseHours: args.slice(3).map((a) => Number(a))
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
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

try {
  const { targetHour, exerciseHours } = parseArguments(process.argv)
  console.log(calculateExercises(exerciseHours, targetHour))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
  
}

export default "test"