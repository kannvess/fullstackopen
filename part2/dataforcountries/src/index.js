import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios'

axios
  .get('https://restcountries.com/v3.1/all')
  .then(response =>
    ReactDOM.createRoot(document.getElementById('root')).render(<App response={response.data} />)
  )