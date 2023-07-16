const anecdotesAtStart = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
	switch (action.type) {
		case "INCREASE_VOTE":
			const id = action.payload.id;
			const anecdoteToChange = state.find((anec) => anec.id === id);
			const newAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1,
			};
			return state.map((anec) => (anec.id === id ? newAnecdote : anec));
		case "ADD_ANECDOTE":
			const newContent = action.payload.anecdote;
			return state.concat(asObject(newContent));
		default:
			return state;
	}
};

export const addAnecdote = (content) => {
	return {
		type: "ADD_ANECDOTE",
		payload: {
			anecdote: content,
		},
	};
};

export const increaseVote = (id) => {
	return {
		type: "INCREASE_VOTE",
		payload: {
			id,
		},
	};
};

export const flterChange = (value) => {
	return {
		type: "FILTER_CHANGE",
		payload: {
			value,
		},
	};
};

export default anecdoteReducer;
