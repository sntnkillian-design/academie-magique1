import React from 'react';
import {createRoot} from 'react-dom/client';
import AppV14 from './AppV14';
import './v14-fix.css';

createRoot(document.getElementById('root')!).render(<React.StrictMode><AppV14/></React.StrictMode>);
