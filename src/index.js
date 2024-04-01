import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const creatorInfo = {
  name: "IamMr-S",
  age: "20"
};
const CreatorContext = createContext(creatorInfo);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CreatorContext.Provider value={creatorInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CreatorContext.Provider>
);

export default CreatorContext;
