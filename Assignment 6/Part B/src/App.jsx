import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Input from "./input.jsx";
import Display from "./display.jsx";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    number: "",
    gender: "",
    email: "",
    age: ""
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Input setFormData={setFormData} />}
        />

        <Route
          path="/display"
          element={<Display formData={formData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;