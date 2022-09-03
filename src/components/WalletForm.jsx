import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import './WalletForm.css';
import { fetchExchange } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchExchange());
  }

  render() {
    const { wallet } = this.props;
    const { currencies } = wallet;

    return (
      <div>
        <h3>Formulário WalletForm</h3>
        <form action="">
          <label htmlFor="value-input">
            Valor:
            {' '}
            <input
              name="value-input"
              type="number"
              data-testid="value-input"
              min={ 0 }
            />
          </label>
          <br />

          <label htmlFor="description-input">
            Descrição:
            {' '}
            <input
              name="description-input"
              type="text"
              data-testid="description-input"
            />
          </label>
          <br />

          <label htmlFor="currency-input">
            Moeda:
            {' '}
            <select
              name="currency-input"
              id="currency-input"
              data-testid="currency-input"
            >
              {
                Object.keys(currencies).map((currency) => (
                  <option value="currency-input" key={ currency }>
                    { currency }
                  </option>
                ))
              }
            </select>
          </label>
          <br />

          <label htmlFor="method-input">
            Método de pagamento:
            {' '}
            <select
              name="method-input"
              id="method-input"
              data-testid="method-input"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-de-credito">Cartão de crédito</option>
              <option value="cartao-de-debito">Cartão de débito</option>
            </select>
          </label>
          <br />

          <label htmlFor="tag-input">
            Categoria:
            {' '}
            <select
              name="tag-input"
              id="tag-input"
              data-testid="tag-input"
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <br />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(WalletForm);