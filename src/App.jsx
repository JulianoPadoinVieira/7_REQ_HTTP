import { useState, useEffect } from "react";
import "./App.css";

const url = "https://jsonplaceholder.typicode.com/users";
// const url = "http://localhost:3000/products";

function App() {
  const [users, setUsers] = useState([]);

  //93(1) - Resgatando dados

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setUsers(data);
    }

    fetchData(users);
  }, []);

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
      </div>
    </>
  );
}

export default App;
