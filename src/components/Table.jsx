import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletInfoAction } from '../redux/actions';
import './Table.css';

class Table extends Component {
  handleDelete = ({ target: { value } }) => {
    const { dispatch, wallet } = this.props;
    const filtro = (wallet.expenses.filter((expe) => (
      expe.id !== parseInt(value, 10)
    )));
    dispatch(walletInfoAction({ expenses: filtro }));
  };

  render() {
    const { wallet } = this.props;
    const { expenses } = wallet;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          {
            expenses.map((x) => (
              <tr key={ x.id }>
                <td>{x.description}</td>
                <td>{x.tag}</td>
                <td>{x.method}</td>
                <td>{parseFloat(x.value).toFixed(2)}</td>
                <td>{x.exchangeRates[x.currency].name}</td>
                <td>
                  {
                    parseFloat(x.exchangeRates[x.currency].ask).toFixed(2)
                  }
                </td>
                <td>
                  {
                    parseFloat((x.value) * x.exchangeRates[x.currency].ask).toFixed(2)
                  }
                </td>
                <td>Real</td>

                <td>
                  <button type="button">Editar</button>
                  <button
                    type="button"
                    value={ x.id }
                    data-testid="delete-btn"
                    onClick={ (event) => (this.handleDelete(event)) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({ wallet: state.wallet });

// Table.propTypes = {
//   expenses: PropTypes.shape({
//     id: PropTypes.number,
//     description: PropTypes.string,
//     tag: PropTypes.string,
//     method: PropTypes.string,
//     value: PropTypes.number,
//     currency: PropTypes.string,
//     exchangeRates: PropTypes.arrayOf({}),
//   }).isRequired,
// };

Table.propTypes = {
  wallet: PropTypes.isRequired,
  dispatch: PropTypes.isRequired,
};

export default connect(mapStateToProps)(Table);
