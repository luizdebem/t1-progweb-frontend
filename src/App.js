import './App.css';
import userPlaceholder from './assets/user_placeholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

function App() {
  // @TODO luizdebem: componente UserCard
  const [users, setUsers] = useState({});

  useEffect(() => {
    console.log('BOm dia');
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await fetch('http://localhost:8080/api/v1/usuarios');
    const users = await data.json();
    console.log(users);
    setUsers(users);
  }

  return (
    <>
      <div className="main">
        <h1>Trabalho Final</h1>
        <h3>Listagem de usuários</h3>

        <div className="user-list">
          {users.map(user => (
            <div className="user-card" key={user.id}>
              <div className="action-buttons">
                <FontAwesomeIcon icon={faTrashAlt} size="lg"></FontAwesomeIcon>
                <FontAwesomeIcon icon={faPencilAlt} size="lg"></FontAwesomeIcon>
              </div>
              <img src={userPlaceholder} alt="luizdebem" className="profile-picture"></img>
              <label>{user.nomeCompleto}</label>
              <label>{user.login}</label>
              <label>{user.cpf}</label>
              <label>{user.dataDeNascimento}</label>
              <label>{user.sexo}</label>
              <label>{user.estadoCivil}</label>
              <label>{user.senha}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
