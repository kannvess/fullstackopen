import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LOGIN } from '../queries';

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('phonenumbers-user-token', token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({
      variables: { username, password },
    });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="username">
          username:
          {' '}
          <input id="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        </label>
        <br />
        <label htmlFor="password">
          password:
          {' '}
          <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </label>
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  setError: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default LoginForm;
