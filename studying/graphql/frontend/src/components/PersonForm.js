import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ALL_PERSONS, CREATE_PERSON } from '../queries';
// eslint-disable-next-line import/no-cycle
import { updateCache } from '../App';

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      setError(error.message);
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_PERSONS }, response.data.addPerson);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    createPerson({
      variables: {
        name,
        phone: phone.length > 0 ? phone : undefined,
        street,
        city,
      },
    });

    setName('');
    setPhone('');
    setStreet('');
    setCity('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <label htmlFor="name">
          name:
          {' '}
          <input id="name" value={name} onChange={({ target }) => setName(target.value)} />
        </label>
        <br />
        <label htmlFor="phone">
          phone:
          {' '}
          <input id="phone" value={phone} onChange={({ target }) => setPhone(target.value)} />
        </label>
        <br />
        <label htmlFor="street">
          street:
          {' '}
          <input id="street" value={street} onChange={({ target }) => setStreet(target.value)} />
        </label>
        <br />
        <label htmlFor="city">
          city:
          {' '}
          <input id="city" value={city} onChange={({ target }) => setCity(target.value)} />
        </label>
        <br />
        <button type="submit">add!</button>
      </form>
    </div>
  );
};

PersonForm.propTypes = {
  setError: PropTypes.func.isRequired,
};

export default PersonForm;
