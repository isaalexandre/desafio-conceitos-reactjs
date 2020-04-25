import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
    
  useEffect(() => {
      api.get('repositories').then(response => {
          setRepositories(response.data);
      });
  }, []); 

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "ReactJs",
      // url: "https://github.com/isaalexandre/desafio-conceitos-reactjs",
      // techs: ["Node.js", "React", "React-Native"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id != id))
  }

  return (
    <div>
      <span>Repositórios </span>
      <ul data-testid="repository-list">        
          {repositories.map(repository => (
          <li key={repository.id}>
            <strong>Repositório: </strong>
            <p> { repository.title }</p>
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>))}        
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
