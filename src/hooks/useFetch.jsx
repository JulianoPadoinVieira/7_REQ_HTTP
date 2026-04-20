import { useEffect, useState } from "react";

// 96(4) - Custom Hooks

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  // 97(5) - Refatorando o POST
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  //98(6) - Loading
  const [loading, setLoading] = useState(false);

  //100(8) - Tratamentos de exceção
  const [error, setError] = useState(null);

  // 9 - Desafio 6
  const [itemId, setItemId] = useState(null);

  const httpConfig = (data, method, id) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod(method);
    }
    if (method == "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
      });

      setMethod(method);
      setItemId(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      //98(6) - Loading
      setLoading(true);

      try {
        const res = await fetch(url);

        const json = await res.json();

        setData(json);
      } catch (error) {
        console.log(`Erro: ${error.message}`);
        setError("Houve um erro ao carregar os dados.");
      }

      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  // 97(5) - Refatorando o POST
  useEffect(() => {
    const httpRequest = async () => {
      let json;

      if (method == "POST") {
        let fetchOptions = [url, config];

        const res = await fetch(...fetchOptions);

        json = await res.json();
        // 9 - Desafio 6
      } else if (method === "DELETE") {
        const deleteUrl = `${url}/${itemId}`;

        const res = await fetch(deleteUrl, config);

        json = await res.json();
      }

      setCallFetch(json);
    };

    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};
