import { useState } from 'react';
// import axios from 'axios';


export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    skill: '',
    availability: '', // Initialize as a JSON string
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('YOUR_ENDPOINT_URL', formData);
      console.log(response.data);
      // Handle response...
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error...
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="skill" className="form-label">Skill</label>
          <input type="text" className="form-control" id="skill" name="skill" value={formData.skill} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="availability" className="form-label">Availability (JSON)</label>
          <textarea className="form-control" id="availability" name="availability" value={formData.availability} onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
