import './App.css';
import userPlaceholder from './assets/user_placeholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <>
      <div className="main">
        <h1>Trabalho Final</h1>
        <h3>Listagem de usuários</h3>

        <div className="user-list">
          <div className="user-card">
            <div className="action-buttons">
              <FontAwesomeIcon icon={faTrashAlt} size="lg"></FontAwesomeIcon>
              <FontAwesomeIcon icon={faPencilAlt} size="lg"></FontAwesomeIcon>
            </div>
            <img src={userPlaceholder} alt="luizdebem" className="profile-picture"></img>
            <label>Luiz Guilherme de Bem</label>
            <label>luizdebem</label>
            <label>555.555.555.55</label>
            <label>14/11/1999</label>
            <label>Masculino</label>
            <label>Solteiro</label>
            <label>Senha</label>
          </div>
          <div className="user-card">
            <div className="action-buttons">
              <FontAwesomeIcon icon={faTrashAlt} size="lg"></FontAwesomeIcon>
              <FontAwesomeIcon icon={faPencilAlt} size="lg"></FontAwesomeIcon>
            </div>
            <img src={userPlaceholder} alt="luizdebem" className="profile-picture"></img>
            <label>Luiz Guilherme de Bem</label>
            <label>luizdebem</label>
            <label>555.555.555.55</label>
            <label>14/11/1999</label>
            <label>Masculino</label>
            <label>Solteiro</label>
            <label>Senha</label>
          </div>
          <div className="user-card">
            <div className="action-buttons">
              <FontAwesomeIcon icon={faTrashAlt} size="lg"></FontAwesomeIcon>
              <FontAwesomeIcon icon={faPencilAlt} size="lg"></FontAwesomeIcon>
            </div>
            <img src={userPlaceholder} alt="luizdebem" className="profile-picture"></img>
            <label>Luiz Guilherme de Bem</label>
            <label>luizdebem</label>
            <label>555.555.555.55</label>
            <label>14/11/1999</label>
            <label>Masculino</label>
            <label>Solteiro</label>
            <label>Senha</label>
          </div>
          <div className="user-card">
            <div className="action-buttons">
              <FontAwesomeIcon icon={faTrashAlt} size="lg"></FontAwesomeIcon>
              <FontAwesomeIcon icon={faPencilAlt} size="lg"></FontAwesomeIcon>
            </div>
            <img src={userPlaceholder} alt="luizdebem" className="profile-picture"></img>
            <label>Luiz Guilherme de Bem</label>
            <label>luizdebem</label>
            <label>555.555.555.55</label>
            <label>14/11/1999</label>
            <label>Masculino</label>
            <label>Solteiro</label>
            <label>Senha</label>
          </div>
          <div className="user-card">
            <div className="action-buttons">
              <FontAwesomeIcon icon={faTrashAlt} size="lg"></FontAwesomeIcon>
              <FontAwesomeIcon icon={faPencilAlt} size="lg"></FontAwesomeIcon>
            </div>
            <img src={userPlaceholder} alt="luizdebem" className="profile-picture"></img>
            <label>Luiz Guilherme de Bem</label>
            <label>luizdebem</label>
            <label>555.555.555.55</label>
            <label>14/11/1999</label>
            <label>Masculino</label>
            <label>Solteiro</label>
            <label>Senha</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
