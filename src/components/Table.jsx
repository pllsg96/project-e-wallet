import React, { Component } from 'react';
import './Table.css';

class Table extends Component {
  render() {
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
        </table>
      </div>
    );
  }
}

export default Table;
