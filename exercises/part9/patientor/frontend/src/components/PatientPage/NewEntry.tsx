import { useState } from "react";
import { Entry } from "../../types";
import patientService from "../../services/patients";
import axios, { AxiosError } from "axios";

interface Props {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  patientId: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const NewEntry = (props: Props) => {
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newSpecialist, setNewSpecialist] = useState('');
  const [newHealthCheckRating, setNewHealthCheckRating] = useState('');
  const [newDiagnosisCodes, setNewDiagnosisCodes] = useState('');
  const [newEntryType, setNewEntryType] = useState<'HealthCheck' | 'OccupationalHealthcare' | 'Hospital'>('HealthCheck');
  const [newEmployerName, setNewEmployerName] = useState('');
  const [newSickLeaveStartDate, setNewSickLeaveStartDate] = useState('');
  const [newSickLeaveEndDate, setNewSickLeaveEndDate] = useState('');
  const [newDischargeDate, setNewDischargeDate] = useState('');
  const [newDischargeCriteria, setNewDischargeCriteria] = useState('');
  
  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const newBaseEntry = {
        date: newDate,
        description: newDescription,
        specialist: newSpecialist,
        diagnosisCodes: newDiagnosisCodes.split(', '),
        type: newEntryType,
      };

      switch (newEntryType) {
        case 'HealthCheck':
          const addedHealthCheckEntry = await patientService.addEntry(props.patientId,
            {
              healthCheckRating: parseInt(newHealthCheckRating),
              ...newBaseEntry,
            }
            );
          props.setEntries(props.entries.concat(addedHealthCheckEntry));
          break;
        case 'OccupationalHealthcare':
          const addedOccupationalHealthcareEntry = await patientService.addEntry(props.patientId,
            {
              employerName: newEmployerName,
              sickLeave: {
                startDate: newSickLeaveStartDate,
                endDate: newSickLeaveEndDate,
              },
              ...newBaseEntry,
            }
          );
          props.setEntries(props.entries.concat(addedOccupationalHealthcareEntry));
          break;
        case 'Hospital':
          const addedHospitalEntry = await patientService.addEntry(props.patientId,
            {
              discharge: {
                date: newDischargeDate,
                criteria: newDischargeCriteria,
              },
              ...newBaseEntry,
            }
          );
          props.setEntries(props.entries.concat(addedHospitalEntry));
          break;
        default:
          break;
      }

    } catch (e: unknown) {
      if (e instanceof AxiosError || axios.isAxiosError(e)) {
        props.setErrorMessage(e.response?.data);
      }
    }

    setNewDescription('');
    setNewDate('');
    setNewSpecialist('');
    setNewDiagnosisCodes('');
    setNewHealthCheckRating('');
    setNewEmployerName('');
    setNewSickLeaveStartDate('');
    setNewSickLeaveEndDate('');
    setNewDischargeDate('');
    setNewDischargeCriteria('');
  };

  return (
    <div style={{ padding: 10,border: 1, borderStyle: 'dotted', borderColor: 'black' }}>
      <h3>
        New
        <select onChange={({ target }) => setNewEntryType(target.value as 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital')}>
          <option value='HealthCheck'>HealthCheck</option>
          <option value='OccupationalHealthcare'>OccupationalHealthcare</option>
          <option value='Hospital'>Hospital</option>
        </select>
        entry</h3>
      <form onSubmit={submit}>
        <label>
          Description:
          {' '}
          <input
            type="text"
            value={newDescription}
            onChange={({ target }) => setNewDescription(target.value)}
          />
        </label>
        <br />
        <label>
          Date:
          {' '}
          <input
            type="text"
            value={newDate}
            onChange={({ target }) => setNewDate(target.value)}
          />
        </label>
        <br />
        <label>
          Specialist:
          {' '}
          <input
            type="text"
            value={newSpecialist}
            onChange={({ target }) => setNewSpecialist(target.value)}
          />
        </label>
        <br />
        <label>
          Diagnosis codes:
          {' '}
          <input
            type="text"
            value={newDiagnosisCodes}
            onChange={({ target }) => setNewDiagnosisCodes(target.value)}
          />
        </label>
        <br />
        {newEntryType === 'HealthCheck'
        ? <label>
            Healthcheck rating:
            {' '}
            <input
              type="text"
              value={newHealthCheckRating}
              onChange={({ target }) => setNewHealthCheckRating(target.value)}
            />
          </label>
        : null
        }
        {newEntryType === 'OccupationalHealthcare'
        ? <>
            <label>
              Employer name:
              {' '}
              <input
                type="text"
                value={newEmployerName}
                onChange={({ target }) => setNewEmployerName(target.value)}
              />
            </label>
            <br />
            <label>
              Sick leave start date:
              {' '}
              <input
                type="text"
                value={newSickLeaveStartDate}
                onChange={({ target }) => setNewSickLeaveStartDate(target.value)}
              />
            </label>
            <br />
            <label>
              Sick leave end date:
              {' '}
              <input
                type="text"
                value={newSickLeaveEndDate}
                onChange={({ target }) => setNewSickLeaveEndDate(target.value)}
              />
            </label>
          </>
        : null
        }
        {newEntryType === 'Hospital'
        ? <>
            <label>
              Discharge date:
              {' '}
              <input
                type="text"
                value={newDischargeDate}
                onChange={({ target }) => setNewDischargeDate(target.value)}
              />
            </label>
            <br />
            <label>
              Discharge criteria:
              {' '}
              <input
                type="text"
                value={newDischargeCriteria}
                onChange={({ target }) => setNewDischargeCriteria(target.value)}
              />
            </label>
          </>
        : null
        }
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewEntry;