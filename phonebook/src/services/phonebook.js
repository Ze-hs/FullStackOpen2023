import axios from "axios";

const baseUrl = "/api/persons";

const create = (newRecord) => {
  const request = axios.post(baseUrl, newRecord);
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, newRecord) => {
  const request = axios.put(`${baseUrl}/${id}`, newRecord);
  return request.then((response) => response.data);
};

const phoneService = {
  create,
  remove,
  getAll,
  update,
};

export default phoneService;
