import { createSlice } from "@reduxjs/toolkit";

const notificationSlicer = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		changeNotification(state, action) {
			return action.payload;
		},

		removeNotification(state, action) {
			return "";
		},
	},
});

export const { changeNotification, removeNotification } =
	notificationSlicer.actions;

export const setNotification = (message, time) => {
	return async (dispatch) => {
		dispatch(changeNotification(message));

		setTimeout(() => {
			dispatch(removeNotification());
		}, time * 1000);
	};
};

export default notificationSlicer.reducer;
