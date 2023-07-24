import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
const commentSlice = createSlice({
	name: 'comment',
	initialState: [],
	reducers: {
		setComments(state, action) {
			return action.payload;
		},

		appendComment(state, action) {
			return state.concat(action.payload);
		}
	}
});

export const { setComments, appendComment } = commentSlice.actions;

export const initializeComments = (id) => {
	return async (dispatch) => {
		const data = await blogService.getComments(id);
		dispatch(setComments(data));
	};
};

export const addComment = (id, data) => {
	return async (dispatch) => {
		const comment = await blogService.postComment(id, data);
		dispatch(appendComment(comment));
	};
};

export default commentSlice.reducer;
