import React from 'react';
import { createRoot } from 'react-dom/client';
import { CustomInputNumber } from './component';
import { RoomAllocation, PageHome } from './pages';


const App = () => {
  return (
    //hint: 元件放置於Page home
    <PageHome />
  )
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />)

