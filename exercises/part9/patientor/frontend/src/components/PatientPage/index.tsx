import { Diagnosis, Entry, Patient } from "../../types";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from "react-router-dom";
import EntryDetails from "./EntryDetails";
import NewEntry from "./NewEntry";
import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
}

const PatientPage = (props: Props) => {
  const patientId = useParams().id;
  const patient = props.patients.find((p) => p.id === patientId);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    if (!patient) {
      setEntries([]);
    } else {
      setEntries(patient.entries);
    }
  }, [patient]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h1>{patient.name} {!(patient.gender === 'other') ? patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon /> : null}</h1>
      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
      <ErrorNotification errorMessage={errorMessage} />
      <NewEntry setErrorMessage={setErrorMessage} entries={entries} setEntries={setEntries} patientId={patient.id} />
      <h2>entries</h2>
      {entries.map((e) =>
        <EntryDetails key={e.id} entry={e} />
      )}
    </div>
  );
};

export default PatientPage;
