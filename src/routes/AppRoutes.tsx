import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetStarted from '../pages/get-started/GetStarted';
import Dashboard from '../pages/dashboard/Dashboard';
import Tmin from '../pages/Tmin';
import TMinReview from 'pages/TMinReview';


 
const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Tmin" element={<Tmin />} />
        <Route path="/Tmin/:id" element={<Tmin />} />
      <Route path="/Tmin/review" element={<TMinReview />} />

     </Routes>
  </BrowserRouter>
);
 
export default AppRoutes;