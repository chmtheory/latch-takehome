import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If desired, mention tags can be retrieved through the following call:
// document.getElementById(mention_id)
// Where 'mention_id' is, naturally, the id of the mention.