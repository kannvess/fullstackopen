import React, { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import { ALL_PERSONS } from './queries';
import Notify from './components/Notify';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  if (result.loading) return <div>loading...</div>;

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button type="button" onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
