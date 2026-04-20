import { useState, useEffect } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";

// const url = "https://jsonplaceholder.typicode.com/users";
const url = "http://localhost:3000/users";

function App() {
  const [users, setUsers] = useState([]);

  // 96(4) - Custom Hooks
  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState([]);
  const [username, setUsername] = useState([]);

  const [action, setAction] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      username,
    };

    // 97(5) - Refatorando o POST
    console.log(user);
    httpConfig(user, "POST");

    setName("");
    setUsername("");
  };

  // 9 - Desafio 6
  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <>
      <div className="App">
        <h1>Lista de Usuários</h1>
        {/*98(6) - Loading*/}
        {loading && <p>Carregando lista...</p>}
        {error && <p>Erro ao carregar a página</p>}
        {!error && (
          <ul>
            {items &&
              items.map((user) => (
                <li key={user.id} style={{ marginBottom: "16px" }}>
                  <p>
                    |- <strong> Nome: </strong> {user.name} |
                    <strong> Usuário: </strong> {user.username} |
                    <strong> Email: </strong> {user.email} |
                    <strong> Endereço: </strong> {user?.address?.street} -|
                    <button
                      onClick={() => handleRemove(user.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                        color: "red",
                      }}
                    >
                      ❌
                    </button>
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
