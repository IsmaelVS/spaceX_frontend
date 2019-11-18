import React, { useState, useEffect } from "react";
import "./App.css";
import api from "./services/api";

export default function PastCapsules() {
  const [capsules, setCapsules] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("all");

  useEffect(() => {
    api
      .get("")
      .then(response => {
        setCapsules(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function handleSearchInput(e) {
    setSearch(e.target.value);
  }

  function handleApi(path) {
    api
      .get(path)
      .then(response => {
        // ({
        //   'past': setPast,
        //   'upcoming': setupcoming
        // })[path](response.data)
        setCapsules(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleChange(e) {
    setValue(e.target.value);
    handleApi(e.target.value);
  }

  return (
    <div className="App-container">
      <header className="App-header">
        <form>
          <input type="text" value={search} onChange={handleSearchInput} />
        </form>
        <select value={value} onChange={handleChange}>
        <option value="all">Todos os lançamentos</option>
        <option value="past">Lançamentos passados</option>
        <option value="upcoming">Último lançamento</option>
        <option value="upcomings">Próximos lançamentos</option>
        <option value="upcomingss">Próximo lançamento</option>
        </select>
        </header>
        <ul className="App-capsule-list">
          {capsules
            .filter(capsule =>
              search
                ? capsule.capsule_serial
                    .toLowerCase()
                    .includes(search.toLowerCase())
                : true
            )
            .map(capsule => (
              <li key={capsule.capsule_serial}>
                <p>Id: {capsule.capsule_id}</p>
                <p>Serial: {capsule.capsule_serial}</p>
                <p>Details: {capsule.details}</p>
                <p>Landings: {capsule.landings}</p>
                <p>Original Launch: {capsule.original_launch}</p>
                <p>Original Launch Unix: {capsule.original_launch_unix}</p>
                <p>reuse Count: {capsule.reuse_count}</p>
                <p>Status: {capsule.status}</p>
                <p>Type: {capsule.type}</p>
              </li>
            ))}
        </ul>
        // <p>{!capsules.length && "Nenhum lançamento encontrado"}</p>
    </div>
  );
}
