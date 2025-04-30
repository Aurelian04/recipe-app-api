import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError({ detail: "Nu ești autentificat." });
      return;
    }

    axios.get('http://127.0.0.1:8000/api/user/me/', {
      headers: {
        Authorization: `Token ${token}`  // ✅ AICI e cheia corectă pentru TokenAuthentication
      }
    })
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        if (err.response) {
          setError(err.response.data);
        } else {
          setError({ detail: "Eroare de rețea sau server." });
        }
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Profilul utilizatorului</h2>

      {user && (
        <div className="card p-4 shadow">
          <p><strong>Nume:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-4">
          <strong>Eroare:</strong> {error.detail}
        </div>
      )}
    </div>
  );
}

export default Profile;
