import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomInputNumber } from './component';
import { RoomAllocation } from './pages';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<CustomInputNumber onChange={(e) => { }} onBlur={(e) => { }} name={'CustomInputNumber'} />} />
        <Route path='/room-allocation' element={<RoomAllocation />} />
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

