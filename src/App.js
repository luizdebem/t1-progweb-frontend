import './App.css';
import userPlaceholder from './assets/user_placeholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { ApiService } from './services/ApiService';
import { Sexo, EstadoCivil } from './helpers/Enums';
import Form from './components/Form';

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
            <Form isEdit={isEdit} user={user} />
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
