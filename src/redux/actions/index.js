export const USER_INFO = 'USER_INFO';
export const WALLET_INFO = 'WALLET_INFO';

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
