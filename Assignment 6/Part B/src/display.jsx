import "./App.css";

function Display({ formData }) {
  return (
    <div className="page">
      <div className="form-card">

        <h1>Student Details</h1>
        <p className="subtitle">Submitted Information</p>

        <div className="details">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>City:</strong> {formData.city}</p>
          <p><strong>Mobile Number:</strong> {formData.number}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Age:</strong> {formData.age}</p>
        </div>

      </div>
    </div>
  );
}

export default Display;