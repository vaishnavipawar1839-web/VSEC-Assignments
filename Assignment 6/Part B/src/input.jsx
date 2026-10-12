import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Input({ setFormData }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    city: "",
    number: "",
    gender: "",
    email: "",
    age: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(form);
    navigate("/display");
  };

  return (
    <div className="page">
      <div className="form-card">

        <h1>Student Registration</h1>
        <p className="subtitle">Fill in your details below</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>

            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  required
                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                />
                Female
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
            />
          </div>

          <button type="submit">Submit</button>

        </form>
      </div>
    </div>
  );
}

export default Input;