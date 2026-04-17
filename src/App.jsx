import { useState, useEffect } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";

// const url = "https://jsonplaceholder.typicode.com/users";
const url = "http://localhost:3000/users";

function App() {
  const [users, setUsers] = useState([]);

  // 96(4) - Custom Hooks
  const { data: items, httpConfig, loading } = useFetch(url);

  const [name, setName] = useState([]);
  const [username, setUsername] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      username,
    };

    // 97(5) - Refatorando o POST
    httpConfig(user, "POST");

    setName("");
    setUsername("");
  };

  return (
    <>
      <div className="App">
        <h1>Lista de Usuários</h1>
        {/*98(6) - Loading*/}
        {loading && <p>Carregando lista...</p>}
        {!loading && (
          <ul>
            {items &&
              items.map((user) => (
                <li key={user.id} style={{ marginBottom: "16px" }}>
                  <p>
                    |- <strong> Nome: </strong> {user.name} |
                    <strong> Usuário: </strong> {user.username} |
                    <strong> Email: </strong> {user.email} |
                    <strong> Endereço: </strong> {user?.address?.street} -|
                  </p>
                </li>
              ))}
          </ul>
        )}
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
            {/* 99(7) - State de loading no post */}
            {loading && (
              <input
                type="submit"
                value="Adicionando"
                disabled
                className="btn"
              />
            )}
            {!loading && (
              <input type="submit" value="Adicionar" className="btn" />
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
