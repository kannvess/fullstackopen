import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { FIND_PERSON } from '../queries';

const Person = ({ person, onClose }) => (
  <div>
    <h2>{person.name}</h2>
    <div>
      {person.address.street}
      {' '}
      {person.address.city}
    </div>
    <div>{person.phone}</div>
    <button type="button" onClick={onClose}>close</button>
  </div>
);

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState('');
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name}
          {' '}
          {p.phone}
          {' '}
          <button type="button" onClick={() => setNameToSearch(p.name)}>
            show address
          </button>
        </div>
      ))}
    </div>
  );
};

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
    }),
    id: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

Persons.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
    }),
    id: PropTypes.string,
  })).isRequired,
};

export default Persons;
