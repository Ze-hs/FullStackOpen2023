import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		createNotification(state, action) {
			return action.payload;
		},
		clearNotification() {
			return null;
		}
	}
});

export const { createNotification, clearNotification } =
	notificationSlice.actions;

export const setNotification = (msg) => {
	return (dispatch) => {
		dispatch(createNotification(msg));

		setTimeout(() => {
			dispatch(clearNotification());
		}, 5000);
	};
};

export default notificationSlice.reducer;
