const filterReducer = (state = "", action) => {
	switch (action.type) {
		case "FILTER_CHANGE":
			return action.payload;
		default:
			return state;
	}
};

export const filterChange = (value) => {
	return {
		type: "FILTER_CHANGE",
		payload: value,
	};
};

export default filterReducer;
