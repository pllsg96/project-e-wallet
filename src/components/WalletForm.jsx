import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './WalletForm.css';
import { fetchExchange, walletInfoAction, moneySpendSum } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'alimentacao',
      exchangeRates: {},

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
      id: walletInfo.expenses.length,
    }, () => {
      console.log(this.state);
      const x = [...walletInfo.expenses, this.state];
      dispatch(walletInfoAction({ expenses: x }));
      dispatch(moneySpendSum({ expenses: x }));
    }, () => {
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
          <br />

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
          <br />

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
          <br />

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
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-de-credito">Cartão de crédito</option>
              <option value="cartao-de-debito">Cartão de débito</option>
            </select>
          </label>
          <br />

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
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <br />

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
