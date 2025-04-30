import { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    axios.post('http://127.0.0.1:8000/api/user/create/', formData)
      .then(res => {
        setResponse(res.data);
        setFormData({ name: '', email: '', password: '' });
      })
      .catch(err => {
        if (err.response) {
          setError(err.response.data);
        } else {
          setError({ detail: 'Eroare de rețea sau server inactiv.' });
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Creare cont nou</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Nume</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Parolă</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Creează cont</button>
      </form>

      {response && (
        <div className="alert alert-success mt-4">
          Utilizator creat cu succes!<br />
          Email: {response.email}<br />
          Nume: {response.name}
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-4">
          <strong>Eroare:</strong> {JSON.stringify(error)}
        </div>
      )}
    </div>
  );
}

export default Register;
