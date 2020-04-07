import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../Context/alert/alertContext';
import AuthContext from '../../Context/auth/authContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearError, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated === true) {
      props.history.push('/');
    }
    if (error === 'User already exist') {
      setAlert('User already exist', 'danger');
      clearError();
      // eslint-disable-next-line
    }
  }, [error, isAuthenticated, props.history]);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      setAlert('please enter all fields ', 'danger');
    } else if (password !== password2) {
      setAlert('passwords do not match.', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
      setUser({
        name: '',
        email: '',
        password: '',
        password2: '',
      });
    }
  };
  return (
    <div className='form-container'>
      <h1>Ragister User</h1>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <input
          type='submit'
          value='Ragister'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
