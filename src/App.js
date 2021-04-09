import './App.css';
import userPlaceholder from './assets/user_placeholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { ApiService } from './services/ApiService';

function App() {
  // @TODO luizdebem: componente UserCard
  const [users, setUsers] = useState([]);

  const apiService = new ApiService();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await apiService.getUsers();
    const users = res.data;
    console.log(users);
    setUsers(users);
  }

  const handleDelete = async (userId) => {
    try {
      await apiService.deleteUserById(userId);
      const updatedList = users.filter(user => user.id !== userId); 
      setUsers(updatedList);
    } catch (err) {}
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
                <FontAwesomeIcon onClick={() => handleDelete(user.id)} icon={faTrashAlt} size="lg"></FontAwesomeIcon>
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
