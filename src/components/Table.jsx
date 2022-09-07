import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Table.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;

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
                  <button type="button">Excluir</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

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
  expenses: PropTypes.isRequired,
};

export default connect(mapStateToProps)(Table);
