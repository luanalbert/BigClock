import React from 'react';
import { createRoot } from 'react-dom/client';
import Clock from './components/clock';
import './styles.css';

const app = <Clock />;

createRoot(document.getElementById('app')).render(app);
