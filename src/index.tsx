import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomInputNumber } from './component/custom-number-input';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CustomInputNumber onChange={console.log} />} />
      </Routes>
    </BrowserRouter>
  )
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>);

