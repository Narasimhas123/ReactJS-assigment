import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("https://randomuser.me/api");
      setUser(response.data.results[0]);
      localStorage.setItem("user", JSON.stringify(response.data.results[0]));
    };

    fetchUser();
  }, []);

  const refreshUser = async () => {
    const response = await axios.get("https://randomuser.me/api");
    setUser(response.data.results[0]);
    localStorage.setItem("user", JSON.stringify(response.data.results[0]));
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        {user && (
          <tbody>
            <tr>
              <td>
                {user.name.title} {user.name.first} {user.name.last}
              </td>
              <td>{user.email}</td>
            </tr>
          </tbody>
        )}
      </table>

      <button
        onClick={refreshUser}
        style={{
          marginTop: "10px"
        }}
      >
        Refresh
      </button>
    </div>
  );
}
