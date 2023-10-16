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
  
  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const newEntry = {
        date: newDate,
        description: newDescription,
        specialist: newSpecialist,
        healthCheckRating: parseInt(newHealthCheckRating),
        diagnosisCodes: newDiagnosisCodes.split(', '),
        type: 'HealthCheck',
      };

      const addedEntry = await patientService.addEntry(props.patientId, newEntry);
      props.setEntries(props.entries.concat(addedEntry));
    } catch (e: unknown) {
      if (e instanceof AxiosError || axios.isAxiosError(e)) {
        props.setErrorMessage(e.response?.data);
      }
    }

    setNewDescription('');
    setNewDate('');
    setNewSpecialist('');
    setNewHealthCheckRating('');
    setNewDiagnosisCodes('');
  };

  return (
    <div style={{ padding: 10,border: 1, borderStyle: 'dotted', borderColor: 'black' }}>
      <h3>New HealthCheck entry</h3>
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
          Healthcheck rating:
          {' '}
          <input
            type="text"
            value={newHealthCheckRating}
            onChange={({ target }) => setNewHealthCheckRating(target.value)}
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
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewEntry;