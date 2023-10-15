import { Diagnosis, Patient } from "../types";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from "react-router-dom";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
}

const PatientPage = (props: Props) => {
  const patientId = useParams().id;
  const patient = props.patients.find((p) => p.id === patientId);

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
      <h2>entries</h2>
      {patient.entries.map((e) =>
        <div key={e.id}>
          <p>{e.date} {e.description}</p>
          <ul>
          {e.diagnosisCodes
            ? e.diagnosisCodes.map((dc) =>
              <li key={dc}>{dc} {props.diagnoses.find((d) => d.code === dc)!.name}</li>
            )
            : null
          }
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientPage;
