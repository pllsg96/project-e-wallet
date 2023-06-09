import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

// ---*---*---*---*---*---*---*---*---*---*---*---*---*---*---* //
describe('Testando página de login Login.jsx', () => {
  test('Verifica se existe um h1', () => {
    renderWithRouterAndRedux(<Login />);
    const h1Welcome = screen.getByRole('heading', { level: 1, name: /Welcome/ });

    expect(h1Welcome).toBeInTheDocument();
  });

  test('Verifica se existe um h3', () => {
    renderWithRouterAndRedux(<Login />);
    const h3Login = screen.getByRole('heading', { level: 3, name: /Login/ });

    expect(h3Login).toBeInTheDocument();
  });

  test('Verifica se existe um input email', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();

    userEvent.type(emailInput, 'abc@abc.com');
  });

  test('Verifica se existe um input password', () => {
    renderWithRouterAndRedux(<Login />);
    const passwordInput = screen.getByTestId('email-input');

    expect(passwordInput).toBeInTheDocument();

    userEvent.type(passwordInput, 'abc123');
  });

  test('Verifica se existe um botão entrar', () => {
    renderWithRouterAndRedux(<Login />);
    const botaoEntrar = screen.getByRole('button', { type: 'submit' });

    expect(botaoEntrar).toBeInTheDocument();
  });

  test('Verifica a rota para carteira', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    history.push('./carteira');

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});

// ---*---*---*---*---*---*---*---*---*---*---*---*---*---*---* //
describe('Testando página de Wallet Wallet.jsx', () => {
  test('Se existe um texto loggedas', () => {
    renderWithRouterAndRedux(<Wallet />);
    const loggedAs = screen.getByTestId('email-field');

    expect(loggedAs).toBeInTheDocument();
  });
  test('Se existe uma tabela', () => {
    renderWithRouterAndRedux(<Wallet />);
    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
  });
});

// ---*---*---*---*---*---*---*---*---*---*---*---*---*---*---* //
describe('Testando página de WalletForm WalletForm.jsx', () => {
  test('Teste a existencia das inputs', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();
    userEvent.type(inputValue, '1');

    const inputDescription = screen.getByTestId('description-input');
    expect(inputDescription).toBeInTheDocument();
    userEvent.type(inputDescription, 'first test');

    const inputCurrency = screen.getByTestId('currency-input');
    expect(inputCurrency).toBeInTheDocument();
    userEvent.type(inputCurrency, 'USD');

    const inputMethod = screen.getByTestId('method-input');
    expect(inputMethod).toBeInTheDocument();
    userEvent.type(inputMethod, 'Dinheiro');

    const inputTag = screen.getByTestId('tag-input');
    expect(inputTag).toBeInTheDocument();
    userEvent.type(inputTag, 'Lazer');

    const buttonDespesa = screen.getByText('Adicionar despesa');
    expect(buttonDespesa).toBeInTheDocument();

    userEvent.click(buttonDespesa);
    const texto = screen.getByText('first test');
    expect(texto).toBeInTheDocument();
  });
});
