import { Patient } from "../types";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from "react-router-dom";

interface Props {
  patients: Patient[]
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
    </div>
  );
};

export default PatientPage;
