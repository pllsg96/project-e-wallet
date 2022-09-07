import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Table.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th><button type="button">Editar/Excluir</button></th>
          </tr>

          {
            expenses.map((x) => (
              <tr key={ x.id }>
                <td>{x.description}</td>
                <td>{x.tag}</td>
                <td>{x.method}</td>
                <td>{x.value}</td>
                <td>{x.currency}</td>
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

              </tr>
            ))
          }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

Table.propTypes = {
  expenses: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    currency: PropTypes.string,
    exchangeRates: PropTypes.arrayOf({}),
  }).isRequired,
};

export default connect(mapStateToProps)(Table);
