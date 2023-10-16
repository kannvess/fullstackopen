import patients from '../../data/patients';
import { Entry, NewEntry, NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = () => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid();
  
  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

const addEntry = (patient: PatientEntry, entry: NewEntry): Entry => {
  const id = uuid();

  const newEntry = {
    id,
    ...entry,
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  addEntry,
};
