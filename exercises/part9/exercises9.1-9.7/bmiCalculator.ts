const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100)**2;

  if (bmi >= 30) return 'Overweight III (Severely obese)'
  if (bmi >= 25) return 'Overweight II (Moderately obese)'
  if (bmi >= 23) return 'Overweight I (At risk)'
  if (bmi >= 18.5) return 'Normal range (Healthy)'
  return 'Underweight (Unhealthy)'
}

console.log(calculateBmi(180, 74))