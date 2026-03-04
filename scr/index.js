import React from 'react';
import ReactDOM from 'react-dom/client'; // Asigură-te că importi corect din 'react-dom/client'
import './index.css';
import App from './App';

// Creează un root și redă aplicația
const root = ReactDOM.createRoot(document.getElementById('root')); // Creează root-ul
root.render( // Renderizează aplicația
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
