import { useState, useEffect } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";

// const url = "https://jsonplaceholder.typicode.com/users";
const url = "http://localhost:3000/users";

function App() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState([]);
  const [username, setUsername] = useState([]);

  // 96(4) - Custom Hooks
  const { data: items, httpConfig } = useFetch(url);

  //93(1) - Resgatando dados

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url);

  //     const data = await res.json();

  //     setUsers(data);
  //   }

  //   fetchData(users);
  // }, []);

  //94(2) - Add users

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      username,
    };

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // });

    // //95(3) - Carregamento dinâmico

    // const addedUser = await res.json();

    // setUsers((prevUsers) => [...prevUsers, addedUser]);

    // 97(5) - Refatorando o POST
    httpConfig(user, "POST");

    setName("");
    setUsername("");
  };

  return (
    <>
      <div className="App">
        <h1>Lista de Usuários</h1>
        <ul>
          {items &&
            items.map((user) => (
              <li key={user.id} style={{ marginBottom: "16px" }}>
                <p>
                  <strong>Nome:</strong> {user.name}
                </p>
                <p>
                  <strong>Usuário:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Endereço:</strong> {user?.address?.street}
                </p>
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
