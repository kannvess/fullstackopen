import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!(height && weight) || (isNaN(Number(height)) || isNaN(Number(weight)))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    })
  }
  
  const bmi = calculateBmi(Number(height), Number(weight));

  return res.status(200).json({
    weight,
    height,
    bmi: bmi
  })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})