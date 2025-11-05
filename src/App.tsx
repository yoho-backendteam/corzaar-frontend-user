import React from "react";
import { Routes, Route } from "react-router-dom";
import ExploreInstitutes from "./Component/Institutes/ExploreInstitutes";
import InstituteDetails from "./Component/Institutes/InstituteDetails";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ExploreInstitutes />} />
      <Route path="/institute/:id" element={<InstituteDetails />} />
    </Routes>
  );
};

export default App;
