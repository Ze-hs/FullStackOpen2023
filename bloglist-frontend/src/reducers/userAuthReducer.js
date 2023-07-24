import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const userSlice = createSlice({
	name: 'userAuth',
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
		clearUser() {
			return null;
		}
	}
});

export const { setUser, clearUser } = userSlice.actions;

export const logIn = (username, password) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login({ username, password });
			dispatch(setUser(user));
			window.localStorage.setItem('loggedUser', JSON.stringify(user));
			await blogService.setToken(user.token);
		} catch (error) {
			dispatch(setNotification('Wrong Credentials'));
		}
	};
};

export const logOut = () => {
	return async (dispatch) => {
		window.localStorage.clear();
		await blogService.setToken(null);
		dispatch(clearUser());
	};
};

export const initializeUserAuth = () => {
	return async (dispatch) => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser');
		if (loggedUserJSON) {
			const loggedUser = JSON.parse(loggedUserJSON);
			dispatch(setUser(loggedUser));
			await blogService.setToken(loggedUser.token);
		}
	};
};

export default userSlice.reducer;
