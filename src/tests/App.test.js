import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import Login from '../pages/Login';

describe('Testando página de login Login.jsx', () => {
  test('Verifica se existe um h1', () => {
    renderWithRouter(<Login />);
    const h1Welcome = screen.getByRole('heading', { level: 1, name: /Welcome/ });

    expect(h1Welcome).toBeInTheDocument();
  });

  test('Verifica se existe um h3', () => {
    renderWithRouter(<Login />);
    const h3Login = screen.getByRole('heading', { level: 3, name: /Login/ });

    expect(h3Login).toBeInTheDocument();
  });

  test('Verifica se existe um botão entrar', () => {
    renderWithRouter(<Login />);
    const botaoEntrar = screen.getByRole('button', { type: 'submit' });

    expect(botaoEntrar).toBeInTheDocument();
  });
});
