import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		increaseVote(state, action) {
			const id = action.payload.id;
			const newAnecdote = action.payload;
			return state.map((anec) => (anec.id === id ? newAnecdote : anec));
		},

		setAnecdotes(state, action) {
			return action.payload;
		},

		appendAnecdotes(state, action) {
			state.push(action.payload);
		},
	},
});

export const { increaseVote, setAnecdotes, appendAnecdotes } =
	anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecList = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecList));
	};
};

export const addAnecdote = (value) => {
	return async (dispatch) => {
		const newAnecdote = {
			content: value,
			votes: 0,
		};

		const data = await anecdoteService.create(newAnecdote);
		dispatch(appendAnecdotes(data));
	};
};

export const addVote = (id) => {
	return async (dispatch, getState) => {
		const anecdotes = getState().anecdotes;
		const oldAnecdote = anecdotes.find((elem) => elem.id === id);

		const newAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 };
		const data = await anecdoteService.update(id, newAnecdote);

		dispatch(increaseVote(data));
	};
};
export default anecdoteSlice.reducer;
