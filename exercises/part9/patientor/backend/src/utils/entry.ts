import { Diagnosis, Discharge, HealthCheckRating, NewEntry, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, SickLeave } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number;
};

const parseType = (type: unknown): 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare' => {
  if (!isString(type)) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }

  switch(type) {
    case 'Hospital':
      return 'Hospital';
    case 'HealthCheck':
      return 'HealthCheck';
    case 'OccupationalHealthCare':
      return 'OccupationalHealthcare';
    default:
      throw new Error(`Incorrect or missing type: ${type}`);
  }
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error (`Incorrect or missing date: ${date}`);
  }

  return date;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error (`Incorrect or missing description: ${description}`);
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (healthCheckRating: number): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
  if (!object || typeof object !== 'object' || !('healthCheckRating' in object)) {
    throw new Error('Incorrect or missing data');
  }

  if (!isNumber(object.healthCheckRating) || !isHealthCheckRating(object.healthCheckRating)) {
    throw new Error(`Incorrect or missing healthCheckRating: ${object.healthCheckRating}`);
  }

  return object.healthCheckRating;
};

const parseEmployerName = (object: unknown): string => {
  if (!object || typeof object !== 'object' || !('employerName' in object)) {
    throw new Error('Incorrect or missing data');
  }

  if (!isString(object.employerName)) {
    throw new Error(`Incorrect or missing employerName: ${object.employerName}`);
  }

  return object.employerName;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)) {
    return false;
  }

  return true;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object' || !('discharge' in object)) {
    throw new Error('Incorrect or missing data');
  }

  if (!isDischarge(object.discharge)) {
    throw new Error(`Incorrect or missing discharge: ${object.discharge}`);
  }

  return object.discharge;
};

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    return false;
  }

  return true;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object' || !('sickLeave' in object)) {
    throw new Error('Incorrect or missing data');
  }

  if (!isSickLeave(object.sickLeave)) {
    throw new Error(`Incorrect or missing sickLeave: ${object.sickLeave}`);
  }

  return object.sickLeave;
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error ('Incorrect or missing data');
  }

  if ('date' in object && 'description' in object && 'specialist' in object && 'type' in object) {
    if (parseType(object.type) === 'HealthCheck') {
      const newEntry: NewHealthCheckEntry = {
        date: parseDate(object.date),
        description: parseDescription(object.description),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: parseType(object.type) as 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object),
      };

      return newEntry;
    }

    if (parseType(object.type) === 'OccupationalHealthcare') {
      if ('sickLeave' in object) {
        const newEntry: NewOccupationalHealthcareEntry = {
          date: parseDate(object.date),
          description: parseDescription(object.description),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          type: parseType(object.type) as 'OccupationalHealthcare',
          employerName: parseEmployerName(object),
          sickLeave: parseSickLeave(object),
        };
  
        return newEntry;
      }

      const newEntry: NewOccupationalHealthcareEntry = {
        date: parseDate(object.date),
        description: parseDescription(object.description),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: parseType(object.type) as 'OccupationalHealthcare',
        employerName: parseEmployerName(object),
      };

      return newEntry;
    }

    if (parseType(object.type) === 'Hospital') {
      const newEntry: NewHospitalEntry = {
        date: parseDate(object.date),
        description: parseDescription(object.description),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: parseType(object.type) as 'Hospital',
        discharge: parseDischarge(object),
      };

      return newEntry;
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewEntry;
