import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
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
          Money spend:
          {' '}
          {' 0 '}
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
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
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
