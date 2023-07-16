import { createSlice } from "@reduxjs/toolkit";

const notificationSlicer = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		changeNotification(state, action) {
			const message = action.payload;
			return message;
		},

		removeNotification(state, action) {
			return "";
		},
	},
});

export const { changeNotification, removeNotification } =
	notificationSlicer.actions;
export default notificationSlicer.reducer;
