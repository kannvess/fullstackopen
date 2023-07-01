import React, { useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import { ALL_PERSONS, PERSON_ADDED } from './queries';
import Notify from './components/Notify';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';

export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    const seen = new Set();
    return a.filter((item) => {
      const k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allPersons }) => ({
    allPersons: uniqByName(allPersons.concat(addedPerson)),
  }));
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

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

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded;
      notify(`${addedPerson.name} added`);
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
    },
  });

  if (result.loading) return <div>loading...</div>;

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
