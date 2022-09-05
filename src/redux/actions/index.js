import getExchangeValues from '../../services/exchangeAPI';

export const USER_INFO = 'USER_INFO';
export const WALLET_INFO = 'WALLET_INFO';
export const REQUEST_EXCHANGE = 'REQUEST_EXCHANGE';
export const RECEIVE_EXCHANGE_SUCCESS = 'RECEIVE_EXCHANGE_SUCCESS';
export const RECEIVE_EXCHANGE_FAILURE = 'RECEIVE_EXCHANGE_FAILURE';

export function userInfoAction(payload) {
  return {
    type: USER_INFO,
    payload,
  };
}

export function walletInfoAction(payload) {
  return {
    type: WALLET_INFO,
    payload,
  };
}

const requestExchange = () => ({
  type: REQUEST_EXCHANGE,
});

// criador de action para requisição bem sucedida
const receiveExchangeSuccess = (payload) => ({
  type: RECEIVE_EXCHANGE_SUCCESS,
  payload,
});

// criador de action para requisição mal sucedida

const receiveExchangeFailure = (payload) => ({
  type: RECEIVE_EXCHANGE_FAILURE,
  payload,
});

export const fetchExchange = () => async (dispatch) => {
  dispatch(requestExchange());

  try {
    const response = await getExchangeValues();
    const rFiltered = Object.keys(response).filter((curren) => (curren !== 'USDT'));
    const allExchangeRates = Object.entries(response).reduce((newObj, [acc, att]) => ({
      ...newObj,
      [acc]: ({
        code: att.code,
        name: att.name,
        ask: att.ask,
      }),
    }), {});
    const successAction = receiveExchangeSuccess({
      currencies: rFiltered,
      allExchangeRates,
    });
    dispatch(successAction);
  } catch (error) {
    const errorAction = receiveExchangeFailure(error);
    dispatch(errorAction);
  }
};
