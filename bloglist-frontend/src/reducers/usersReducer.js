import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';
const usersSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		setUsers(state, action) {
			return action.payload;
		}
	}
});

export const { setUsers } = usersSlice.actions;

export const initializeUsers = () => {
	return async (dispatch) => {
		const userList = await usersService.getAll();
		dispatch(setUsers(userList));
	};
};

export default usersSlice.reducer;
