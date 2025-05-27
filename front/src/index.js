import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // importa o BrowserRouter
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* agora o React Router vai funcionar */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
