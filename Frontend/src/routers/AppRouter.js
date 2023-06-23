import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Form from "../pages/Form/Form";
import Profile from "../pages/Profile/Profile";
import Factors from "../pages/Factors/Factor";
import Practices from "../pages/Practices/Practices";
import DetailGP from "../pages/DetailGP/DetailGP";
import ModelFP from "../pages/ModelFP/ModelFP";
import Table from "../pages/Table/Table";
import { TourProvider } from '@reactour/tour'
import { steps } from "../utils/step.js"

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/factors" element={<Factors />} />
        <Route path="/practices" element={<Practices />} />
        <Route path="/details" element={<DetailGP />} />
        <Route path="/model" element={<ModelFP />} />
        <Route path="/table" element={<TourProvider steps={steps}>   <Table /> </TourProvider>} />
      </Routes>
    </Router>
  );
}
