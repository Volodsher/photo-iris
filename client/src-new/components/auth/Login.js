import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../layout/MyButton/MyButton';
import { loginUser } from '../../features/authSlice';

const Login = () => {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nameOrEmail: '',
    password: '',
  });

  const { nameOrEmail, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // Redirect if logged in
  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div
      style={{
        marginBottom: '100px',
      }}
    >
      <h1>Log In</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email or Name"
            name="nameOrEmail"
            value={nameOrEmail}
            onChange={(e) => onChange(e)}
          />
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <MyButton
            type="submit"
            value="Login"
            borderColor="var(--light-gray)"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
