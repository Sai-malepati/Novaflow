import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetStarted from '../pages/get-started/GetStarted';
import Dashboard from '../pages/dashboard/Dashboard';
import Tmin from '../pages/Tmin';
import TMinReview from '../pages/TMinReview';
import TMinDocs from '../pages/TMinDocs';
import TMinModel from '../pages/TMinModel';
import TMinReport from '../pages/TMinReport';


 
const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tmin" element={<Tmin />} />
      <Route path="/tmin/review" element={<TMinReview />} />
      <Route path="/tmin/docs" element={<TMinDocs />} /> {/* new page */}
      <Route path="/tmin/model" element={<TMinModel />} />
      <Route path="/tmin/report" element={<TMinReport />} />
    </Routes>
  </BrowserRouter>
)
 
export default AppRoutes;