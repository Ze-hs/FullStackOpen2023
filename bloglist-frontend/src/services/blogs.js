import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

const getConfig = () => {
	return {
		headers: { Authorization: token }
	};
};

const getAll = () => {
	const request = axios.get(baseUrl, getConfig());
	return request.then((response) => response.data);
};

const create = async (data) => {
	const request = await axios.post(baseUrl, data, getConfig());
	return request.data;
};

const update = async (id, data) => {
	const request = await axios.put(`${baseUrl}/${id}`, data, getConfig());
	return request.data;
};

const remove = async (id) => {
	const request = await axios.delete(`${baseUrl}/${id}`, getConfig());
	return request.data;
};

export default { getAll, setToken, create, update, remove };