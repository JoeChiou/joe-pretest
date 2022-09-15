import React from 'react';
import ReactDom from 'react-dom/client';
import HelloWorld from '../App';
const container = document.getElementById('root');
const root = ReactDom.createRoot(container); 
root.render(<HelloWorld tab="home" />);
