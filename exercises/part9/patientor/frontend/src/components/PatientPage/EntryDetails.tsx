import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: Entry;
}

const asserNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails = (props: Props) => {
  switch(props.entry.type) {
    case 'Hospital':
      return <HospitalEntryComponent entry={props.entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryComponent entry={props.entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComponent entry={props.entry} />;
    default:
      asserNever(props.entry);
  }
};

const HealthCheckEntryComponent: React.FC<{entry: HealthCheckEntry}> = ({ entry }) => {
  let favoriteIconColor = 'black';

  switch (entry.healthCheckRating) {
    case 0:
      favoriteIconColor = 'green';
      break;
    case 1:
      favoriteIconColor = 'yellow';
      break;
    case 2:
      favoriteIconColor = 'orange';
      break;
    case 3:
      favoriteIconColor = 'red';
      break;
    default:
      break;
  }
  
  return (
    <div style={{ padding: 5, marginBottom: 5, border: 1, borderStyle: 'solid', borderColor: 'black'  }}>
      <b>
        {entry.date} <MedicalServicesIcon />
        <br />
        <i>{entry.description}</i>
        <br />
        <FavoriteIcon
          htmlColor={favoriteIconColor}
        />
        <br />
        diagnose by {entry.specialist}
      </b>
    </div>
  );
};

const OccupationalHealthcareEntryComponent: React.FC<{entry: OccupationalHealthcareEntry}> = ({ entry }) => {
  return (
    <div style={{ padding: 5, marginBottom: 5, border: 1, borderStyle: 'solid', borderColor: 'black'  }}>
      <b>
        {entry.date} <WorkIcon /> {entry.employerName}
        <br />
        {entry.description}
        <br />
        diagnose by {entry.specialist}
      </b>
    </div>
  );
};

const HospitalEntryComponent: React.FC<{entry: HospitalEntry}> = ({ entry }) => {
  return (
    <div style={{ padding: 5, marginBottom: 5, border: 1, borderStyle: 'solid', borderColor: 'black'  }}>
      <b>
        {entry.date} <LocalHospitalIcon />
        <br />
        <i>{entry.description}</i>
        <br />
        diagnose by {entry.specialist}
      </b>
    </div>
  );
};

export default EntryDetails;
