import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!(height && weight) || (isNaN(Number(height)) || isNaN(Number(weight)))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }
  
  const bmi = calculateBmi(Number(height), Number(weight));

  return res.status(200).json({
    weight,
    height,
    bmi: bmi
  });
});

app.post('/exercises', (req, res) => {  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!(daily_exercises && target)) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if (!(daily_exercises instanceof Array) || daily_exercises.find((e: unknown) => isNaN(Number(e))) || isNaN(Number(target)) || target instanceof Array ) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const exerciseResult = calculateExercises(daily_exercises, target);

  return res.json(exerciseResult);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});