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

export const deployingTestName = data => {
  return axios.post(`${baseURL}/testsNames`, data);
};

export const addWord = data => {
  const { id } = data;
  return axios.put(`${baseURL}/dictionary/${id}`, data);
};

export const getDataAllTests = () => {
  return axios.get(`${baseURL}/testsNames`);
};

export const getTestData = id => {
  return axios.get(`${baseURL}/tests/${id}`);
};

export const updateThisTest = data => {
  const { id, testName, entities, ids, created } = data;
  const questions = {
    entities,
    ids,
  };
  const test = {
    testName,
    questions,
    id,
    created,
  };
  return axios.put(`${baseURL}/tests/${id}`, test);
};

export const updateFieldNameTest = data => {
  return axios.put(`${baseURL}/testsNames/${data.id}`, data);
};

export const getTestForPassingTest = id => {
  return axios.get(`${baseURL}/tests/${id}`);
};

export const deleteThisFilm = id => {
  return axios.delete(`${baseURL}/tests/${id}`);
};

export const deleteFieldNameTest = id => {
  return axios.delete(`${baseURL}/testsNames/${id}`);
};
