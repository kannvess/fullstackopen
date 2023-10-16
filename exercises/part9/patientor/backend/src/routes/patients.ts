import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/patient';
import toNewEntry from '../utils/entry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patients = patientService.getEntries();

  const patientId = req.params.id;

  const patient = patients.find((p) => p.id === patientId);

  res.status(200).json(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }

    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    
    const patientId = req.params.id;
    const patient = patientService.getEntries().find((p) => p.id === patientId);

    if (!patient) {
      return res.status(400).send('Something went wrong. Error: No patient found by the given ID');
    }

    const addedEntry = patientService.addEntry(patient, newEntry);
    return res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }

    return res.status(400).send(errorMessage);
  }
});

export default router;
