import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../Context/alert/alertContext';
import AuthContext from '../../Context/auth/authContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearError, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated === true) {
      props.history.push('/');
    }
    if (error === 'Invalid cradential') {
      setAlert(error, 'danger');
      clearError();
      // eslint-disable-next-line
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('please enter all fields ', 'danger');
    } else {
      login({
        email,
        password,
      });
      setUser({
        email: '',
        password: '',
      });
    }
  };
  return (
    <div className='form-container'>
      <h1>Ragister User</h1>

      <form onSubmit={onSubmit}>
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
            required
          />
        </div>

        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
