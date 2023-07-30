interface HeightAndWeight {
  height: number,
  weight: number,
}

const parseArguments = (args: string[]): HeightAndWeight => {
  if (args.length < 4) throw new Error('Not enough arguments!')
  if (args.length > 4) throw new Error('Too much arguments!')

  if (!(isNaN(Number(args[2])) || isNaN(Number(args[3])))) {
    return {
      height: Number(args[2]),
      weight: Number(args[2]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100)**2;

  if (bmi >= 30) return 'Overweight III (Severely obese)'
  if (bmi >= 25) return 'Overweight II (Moderately obese)'
  if (bmi >= 23) return 'Overweight I (At risk)'
  if (bmi >= 18.5) return 'Normal range (Healthy)'
  return 'Underweight (Unhealthy)'
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage);
}

export { calculateBmi }