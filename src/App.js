import './App.css';
import userPlaceholder from './assets/user_placeholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { ApiService } from './services/ApiService';
import { Sexo, EstadoCivil } from './helpers/Enums';

function App() {
  // @TODO luizdebem: componente UserCard
  // @TODO luizdebem: componente pro form
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [userID, setUserID] = useState('');

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [cpf, setCPF] = useState('');

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
    } catch (err) { }
  }

  const openForm = (flag) => {
    if (form && flag === isEdit) return setForm(false);
    setForm(true);
    setIsEdit(flag);
  }

  const setUserOnForm = (user) => {
    setUserID(user.id);
    setLogin(user.login);
    setSenha(user.senha);
    setNomeCompleto(user.nomeCompleto);
    setDataDeNascimento(user.dataDeNascimento);
    setSexo(user.sexo);
    setEstadoCivil(user.estadoCivil);
    setCPF(user.cpf);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let user = {
      login,
      senha,
      nomeCompleto,
      dataDeNascimento,
      estadoCivil,
      sexo,
      cpf
    }

    if (isEdit) {
      user = {
        ...user,
        id: userID
      }
    }

    try {
      isEdit ? await apiService.updateUser(user) : await apiService.postUser(user);
      const updatedUsers = [...users, user];
      setUsers(updatedUsers);
      setForm(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="main">
        <h1>Trabalho Final</h1>

        <div>
          <button style={{ padding: 15 }} onClick={() => openForm(false)} >Incluir novo usuário</button>
        </div>

        {form &&
          <>
            <h3>{isEdit ? 'Formulário de edição' : 'Formulário de inclusão'}</h3>
            <form onSubmit={handleFormSubmit}>
              <input value={login} type="text" placeholder="Login" onChange={(e) => { setLogin(e.target.value) }}></input>
              <input value={senha} type="password" placeholder="Senha" onChange={(e) => { setSenha(e.target.value) }}></input>
              <input value={nomeCompleto} type="text" placeholder="Nome completo" onChange={(e) => { setNomeCompleto(e.target.value) }}></input>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: 12 }}>Data de nascimento:</label>
                <input value={dataDeNascimento} type="date" onChange={(e) => { setDataDeNascimento(e.target.value) }}></input>
              </div>
              <select value={sexo} onChange={(e) => { setSexo(e.target.value) }}>
                <option value={null} selected disabled>Gênero</option>
                {Object.entries(Sexo).map(val => <option key={val[0]} value={val[0]}>{val[1]}</option>)}
              </select>
              <select value={estadoCivil} onChange={(e) => { setEstadoCivil(e.target.value) }}>
                <option value={null} selected disabled>Estado civil</option>
                {Object.entries(EstadoCivil).map(val => <option key={val[0]} value={val[0]}>{val[1]}</option>)}
              </select>
              <input value={cpf} type="text" placeholder="CPF" onChange={(e) => { setCPF(e.target.value) }}></input>
              <button type="submit">Enviar</button>
            </form>
          </>
        }

        <h3>Listagem de usuários</h3>

        <div className="user-list">
          {users.map(user => (
            <div className="user-card" key={user.id}>
              <div className="user-card-action-buttons">
                <FontAwesomeIcon onClick={() => handleDelete(user.id)} icon={faTrashAlt} size="lg"></FontAwesomeIcon>
                <FontAwesomeIcon onClick={() => {
                  openForm(true);
                  setUserOnForm(user);
                }} icon={faPencilAlt} size="lg"></FontAwesomeIcon>
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
