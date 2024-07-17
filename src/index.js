import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Certificate from './Components/Certificate';
import Project from './Components/Project';
import Details  from './Components/Details';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

   <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/certificate" element={<Certificate />} />
                <Route path="/project" element={<Project />} />
                <Route path="/showproject/:id" element={<Details />} />
            </Routes>
        </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
