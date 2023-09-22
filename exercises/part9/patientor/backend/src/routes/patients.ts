import express from 'express';
import patientService from '../services/patientService';
import { NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const addedEntry = patientService.addPatient(req.body as NewPatientEntry);

  res.json(addedEntry);
});

export default router;
