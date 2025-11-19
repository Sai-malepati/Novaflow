import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GetStarted from "../pages/get-started/GetStarted"
import Dashboard from "../pages/dashboard/Dashboard"
import Tmin from "../pages/Tmin"
import TMinReview from "../pages/TMinReview"
import TMinDocs from "../pages/TMinDocs"
import TMinModel from "../pages/TMinModel"
import TMinReport from "../pages/TMinReport"
import Register from "../pages/Register" 
import UploadFile from "../pages/hit_leak/UploadFile"


const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/tmin" element={<Tmin />} />
      <Route path="/tmin-review" element={<TMinReview />} />
      <Route path="/tmin-docs" element={<TMinDocs />} /> 
      <Route path="/tmin-model" element={<TMinModel />} />
      <Route path="/tmin-report" element={<TMinReport />} />
       <Route path="/upload-file" element={<UploadFile />} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
