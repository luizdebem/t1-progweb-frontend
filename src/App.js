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
  const [sexo, setSexo] = useState(null);
  const [estadoCivil, setEstadoCivil] = useState(null);
  const [cpf, setCPF] = useState('');

  const apiService = new ApiService();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await apiService.getUsers();
    const users = res.data;
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
    window.scrollTo(0, 0);
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

  const validate = (user) => {
    for (let property in user) {
      if (user[property] === '') {
        alert('Todas as entradas são obrigatórias.')
        return false;
      }
    }
    return true;
  }

  const cleanForm = () => {
    setLogin('');
    setSenha('');
    setNomeCompleto('');
    setDataDeNascimento('');
    setSexo(null);
    setEstadoCivil(null);
    setCPF('');
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

    if (!validate(user)) return;

    if (isEdit) {
      user = {
        ...user,
        id: userID
      }
    }

    try {
      if (isEdit) {
        await apiService.updateUser(user);
        const uniqueUsers = users.filter(u => u.id !== user.id);
        const updatedUsers = [...uniqueUsers, user].sort((a, b) => a.id - b.id);
        setUsers(updatedUsers);
        setForm(false);
        cleanForm();
      } else {
        const res = await apiService.postUser(user);
        const uniqueUsers = users.filter(u => u.id !== res.data.id);
        const updatedUsers = [...uniqueUsers, res.data];
        setUsers(updatedUsers);
        setForm(false);
      }
      cleanForm();
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
            <p>* campos obrigatórios</p>
            <form onSubmit={handleFormSubmit}>
              <input value={login} type="text" placeholder="Login *" onChange={(e) => { setLogin(e.target.value) }}></input>
              <input value={senha} type="password" placeholder="Senha *" onChange={(e) => { setSenha(e.target.value) }}></input>
              <input value={nomeCompleto} type="text" placeholder="Nome completo *" onChange={(e) => { setNomeCompleto(e.target.value) }}></input>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: 12 }}>Data de nascimento *</label>
                <input value={dataDeNascimento} type="date" onChange={(e) => { setDataDeNascimento(e.target.value) }}></input>
              </div>
              <select value={sexo} onChange={(e) => { setSexo(e.target.value) }}>
                <option defaultValue={null} disabled>Gênero *</option>
                {Object.entries(Sexo).map(val => <option key={val[0]} value={val[0]}>{val[1]}</option>)}
              </select>
              <select value={estadoCivil} onChange={(e) => { setEstadoCivil(e.target.value) }}>
                <option defaultValue={null} disabled>Estado civil *</option>
                {Object.entries(EstadoCivil).map(val => <option key={val[0]} value={val[0]}>{val[1]}</option>)}
              </select>
              <input value={cpf} type="text" placeholder="CPF *" onChange={(e) => { setCPF(e.target.value) }}></input>
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
              <label><b>NOME:</b> {user.nomeCompleto}</label>
              <label><b>LOGIN:</b> {user.login}</label>
              <label><b>CPF:</b> {user.cpf}</label>
              <label><b>DATA DE NASCIMENTO:</b> {user.dataDeNascimento}</label>
              <label><b>GÊNERO:</b> {user.sexo}</label>
              <label><b>ESTADO CIVIL:</b> {user.estadoCivil}</label>
              <label><b>SENHA:</b> {user.senha}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
