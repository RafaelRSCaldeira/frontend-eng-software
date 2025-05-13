import React, { StrictMode } from 'react'; // Importando o StrictMode
import ReactDOM from 'react-dom/client';  // Certifique-se de usar 'react-dom/client' no React 18
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById('root'));  // Obtendo o elemento 'root'
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);