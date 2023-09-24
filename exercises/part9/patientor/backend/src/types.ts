export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>; 

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
