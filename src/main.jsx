import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { PopupProvider } from './components/Popups/PopupManager';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <PopupProvider>
        <App />
      </PopupProvider>
    </HashRouter>
  </React.StrictMode>
);
