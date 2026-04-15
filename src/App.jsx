import { useState, useEffect } from "react";
import "./App.css";

// const url = "https://jsonplaceholder.typicode.com/users";
const url = "http://localhost:3000/users";

function App() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState([]);
  const [username, setUsername] = useState([]);

  //93(1) - Resgatando dados

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setUsers(data);
    }

    fetchData(users);
  }, []);

  //94(2) - Add users

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      username,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  return (
    <>
      <div className="App">
        <h1>Lista de Usuários</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              Nome: {user.name}
              <br />
              Usuário na rede: {user.username}
              <br />
              E-mail: {user.email}
              <br />
              ----------------------------
            </li>
          ))}
        </ul>
        <div className="add-user">
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                value={name}
                name="Nome"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Usuário na rede:
              <input
                type="text"
                value={username}
                name="Usuário de rede"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <input type="submit" value="Criar" />
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
