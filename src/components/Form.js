import React from 'react'

const Form = () => {
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
      isEdit ? await apiService.updateUser(user) : await apiService.postUser(user);
      const uniqueUsers = users.filter(u => u.id !== user.id);
      const updatedUsers = [...uniqueUsers, user];
      setUsers(updatedUsers);
      setForm(false);

      cleanForm();
    } catch (err) {
      console.log(err);
    }
  }

  return (
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
  )
}

export default Form
