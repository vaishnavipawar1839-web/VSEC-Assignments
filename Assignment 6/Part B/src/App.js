import { BrowerRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Input from "./input.jsx";
import Display from "./display.jsx";

function App() {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");

    return(
      <BrowerRouter>
      <Routes>
        <Route
          path="/"
            element={
                <Input  
                   setName={setName}
                    setCity={setCity}
                />
             }
            />
            <Route
             path="/display"
              element={
                <Display
                name={name}
                 city={city}
                    />
                 }
                 
                 />
                 </Routes>
                 </BrowerRouter>
    );
}