import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './WalletForm.css';
import { fetchExchange, walletInfoAction } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0.00,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'alimentacao',
      id: 0,
      exchangeRates: [],

    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchExchange());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    dispatch(fetchExchange());
    const { walletInfo } = this.props;
    this.setState({
      exchangeRates: walletInfo.allExchangeRates,
      id: (walletInfo.expenses.length),
    }, () => {
      const {
        id,
        exchangeRates,
        value,
        description,
        currency,
        method,
        tag } = this.state;
      console.log(exchangeRates);
      const objetoDasKeys = {
        id,
        exchangeRates,
        value,
        description,
        currency,
        method,
        tag,
      };
      const x = [...walletInfo.expenses, objetoDasKeys];
      console.log(x);
      dispatch(walletInfoAction({ expenses: x }));

      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'alimentacao',
      });
    });
  };

  render() {
    const { walletInfo } = this.props;
    const { currencies } = walletInfo;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <div>
        <h3>Formulário WalletForm</h3>
        <form action="">
          <label htmlFor="value">
            Valor:
            {' '}
            <input
              name="value"
              type="number"
              data-testid="value-input"
              min={ 0 }
              onChange={ this.handleChange }
              value={ value }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            {' '}
            <input
              name="description"
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>

          <label htmlFor="currency-input">
            Moeda:
            {' '}
            <select
              name="currency"
              id="currency-input"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {
                currencies.map((curr) => (
                  <option
                    key={ curr }
                    value={ curr }
                  >
                    { curr }
                  </option>
                ))
              }
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento:
            {' '}
            <select
              name="method"
              id="method-input"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Categoria:
            {' '}
            <select
              name="tag"
              id="tag-input"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button
            type="button"
            onClick={ () => this.handleSubmit() }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ walletInfo: state.wallet });

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  walletInfo: PropTypes.shape({
    currencies: PropTypes.string,
    expenses: PropTypes.arrayOf(PropTypes.string),
    allExchangeRates: PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
      ask: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
