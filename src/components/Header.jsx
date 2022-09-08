import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  allSpendedMoney = () => {
    const { wallet: { expenses } } = this.props;
    const totalSpend = expenses.reduce((acc, atual) => {
      const valor = parseInt(atual.value, 10);
      const cambio = atual.exchangeRates[atual.currency].ask;
      const cambioFloat = parseFloat(cambio);
      const total = (cambioFloat * valor);
      return parseFloat((acc + total).toFixed(2));
    }, 0);
    if (totalSpend !== 0.00) return totalSpend;
    return 0.00;
  };

  render() {
    const { user } = this.props;
    const { email } = user;
    return (
      <div className="header__div">
        <h2>Header</h2>
        <p data-testid="email-field">
          Logged as:
          {' '}
          { email }
        </p>
        <p data-testid="total-field">
          {
            (this.allSpendedMoney()).toFixed(2)
          }
        </p>
        <p data-testid="header-currency-field">
          {' BRL '}
        </p>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(Object),
  }).isRequired,
};

// EX: Pokemon.propTypes = {
//   pokemon: PropTypes.shape({
//     name: PropTypes.string,
//     id: PropTypes.number,
//     base_stamina: PropTypes.number,
//     base_defense: PropTypes.number
//   })
// }

export default connect(mapStateToProps)(Header);
