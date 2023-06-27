import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { EDIT_NUMBER } from '../queries';

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  const submit = (event) => {
    event.preventDefault();

    changeNumber({
      variables: { name, phone },
    });

    setName('');
    setPhone('');
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('person not found');
    }
  }, [result.data]);

  return (
    <div>
      <h2>change number</h2>
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
        <button type="submit">change number</button>
      </form>
    </div>
  );
};

PhoneForm.propTypes = {
  setError: PropTypes.func.isRequired,
};

export default PhoneForm;
