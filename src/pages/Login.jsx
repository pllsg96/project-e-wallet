import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userInfoAction } from '../redux/actions';
import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  checkingLoginData = () => {
    const { password, email } = this.state;
    const minPasswordLength = 6;
    if (password.length >= minPasswordLength
      && email.includes('.com')
      && email.includes('@')) {
      this.setState({ isDisabled: false });
    } else this.setState({ isDisabled: true });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.checkingLoginData();
    });
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    dispatch(userInfoAction(this.state));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <div>
        <h1>Welcome to Trybewallet</h1>
        <div className="login__box">
          <h3>Login</h3>
          <input
            type="email"
            placeholder="email@example.com"
            data-testid="email-input"
            onChange={ this.handleChange }
            name="email"
            value={ email }
          />
          <input
            type="password"
            data-testid="password-input"
            minLength={ 6 }
            onChange={ this.handleChange }
            name="password"
            value={ password }
            placeholder="enter your password"
          />
          <button
            type="submit"
            onClick={ () => { this.handleSubmit(); } }
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect()(Login);
