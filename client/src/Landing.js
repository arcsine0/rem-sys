import React, {useState} from 'react';
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'

import './index.css';

// pages
import Home from './pages/Home';
import Test from './pages/Test'

function Landing() {
  const navigate = useNavigate();

  return (
    <div className='row'>
      <div className='sideMenu col-2'>
        <ul>
            <li>
              <a onClick={() => (navigate('/'))}>Home</a>
            </li>
            <li>
              <a onClick={() => (navigate('/test'))}>Test</a>
            </li>
        </ul>
      </div>
      <div className='content col-10'>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/test" element={<Test />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Landing;

