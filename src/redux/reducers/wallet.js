// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  // WALLET_INFO,
  REQUEST_EXCHANGE,
  RECEIVE_EXCHANGE_SUCCESS,
  RECEIVE_EXCHANGE_FAILURE,
} from '../actions';

// const moedas = {
//   USD: '',
//   BRL: '',
//   YEN: '',
// };

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  spendedMoney: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_EXCHANGE:
    return {
      ...state,
    };

  case RECEIVE_EXCHANGE_SUCCESS:
    return {
      ...state,
      ...action.payload,
    };

  case RECEIVE_EXCHANGE_FAILURE:
    return {
      ...state,
      erro: action.payload,
    };

  default:
    return state;
  }
}

export default wallet;
