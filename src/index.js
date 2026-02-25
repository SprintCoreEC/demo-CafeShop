import React from 'react';
import ReactDOM from 'react-dom'; // Usa react-dom para React 16
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CarritoProvider } from './services/carritoProvider';

ReactDOM.render(
  <React.StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Si quieres comenzar a medir el rendimiento en tu aplicación, pasa una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o envía a un endpoint de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();