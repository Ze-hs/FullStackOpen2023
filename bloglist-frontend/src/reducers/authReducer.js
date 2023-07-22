import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: null,
	reducers: {
		setAuth(state, action) {
			return action.payload;
		},
		clearAuth() {
			return null;
		}
	}
});
export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
