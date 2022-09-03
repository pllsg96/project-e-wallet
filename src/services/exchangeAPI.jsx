const apiURL = 'https://economia.awesomeapi.com.br/json/all';

const getExchangeValues = async () => {
  const response = await fetch(apiURL);
  const json = await response.json();
  return json;
};

export default getExchangeValues;
