import { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [token, setToken] = useState(null);
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
    setToken(null);

    axios.post('http://127.0.0.1:8000/api/user/token/', formData)
      .then(res => {
        const receivedToken = res.data.token;
        setToken(receivedToken);
        localStorage.setItem('token', receivedToken);  // 🔐 salvăm tokenul
        setFormData({ email: '', password: '' });
      })
      .catch(err => {
        if (err.response) {
          setError(err.response.data);
        } else {
          setError({ detail: 'Eroare de rețea sau server.' });
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Autentificare</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
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

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      {token && (
        <div className="alert alert-success mt-4">
          Autentificare reușită!<br />
          <strong>Token:</strong> {token}
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

export default Login;
