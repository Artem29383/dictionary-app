import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const auth = () => {
  return axios.get(`${baseURL}/auth`);
};

export const register = data => {
  axios.post(`${baseURL}/auth`, data).then(() =>
    axios.post(`${baseURL}/dictionary`, {
      id: data.id,
      login: data.login,
      words: [],
    })
  );
};

export const getDictionary = login => {
  return axios.get(`${baseURL}/dictionary?login=${login}`);
};

export const deployingTest = data => {
  return axios.post(`${baseURL}/tests`, data);
};

export const addWord = data => {
  const { id } = data;
  return axios.put(`${baseURL}/dictionary/${id}`, data);
};
