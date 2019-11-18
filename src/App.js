import React, { useState, useEffect } from "react";
import "./App.css";
import api from "./services/api";

export default function PastCapsules() {
  const [capsules, setCapsules] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("all_capsules");

  useEffect(() => {
    api
      .get("all_capsules")
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
        setCapsules(Array.isArray(response.data) ? response.data : [response.data]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleChange(e) {
    setValue(e.target.value);
    handleApi(e.target.value);
  }

  const filteredCapsules = capsules
  .filter(capsule =>
    search
      ? capsule.capsule_serial
          .toLowerCase()
          .includes(search.toLowerCase())
      : true
  )

  return (
    <div className="App-container">
      <header className="App-header">
        <span>Space X</span>
        <div className="App-header-filter">
          <input type="text" value={search} onChange={handleSearchInput} placeholder="Pesquisar serial do lançamento" />
          <select value={value} onChange={handleChange}>
          <option value="all_capsules">Todos os lançamentos</option>
          <option value="past_capsules">Lançamentos passados</option>
          <option value="past_capsule">Último lançamento</option>
          <option value="upcoming_capsules">Próximos lançamentos</option>
          <option value="upcoming_capsule">Próximo lançamento</option>
          </select>
        </div>
      </header>
      <div className="App-list">
        {filteredCapsules.length ?
        <ul className="App-capsule-list">
          {filteredCapsules.map(capsule => (
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
        : <span> Nenhum lançamento encontrado </span>
        }
      </div>
    </div>
  );
}
