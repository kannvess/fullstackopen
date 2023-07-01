import { gql } from '@apollo/client';

const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    name
    phone
    address {
      street
      city
    }
    id
  }
`;

export const ALL_PERSONS = gql`
  query {
    allPersons {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $phone: String
    $street: String!
    $city: String!
  ) {
    addPerson(
      name: $name
      phone: $phone
      street: $street
      city: $city
    ) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;

export const EDIT_NUMBER = gql`
  mutation editNumber(
    $name: String!
    $phone: String!
  ) {
    editNumber(
      name: $name
      phone: $phone
    ) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;

export const LOGIN = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`;

export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;
