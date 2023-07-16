import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector(({ anecdotes, filter }) => {
		const newlist = anecdotes.filter(({ content }) =>
			content.includes(filter)
		);
		return newlist.sort((a, b) => b - a);
	});

	const dispatch = useDispatch();

	const vote = (id) => dispatch(increaseVote(id));

	return (
		<>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</>
	);
};

export default AnecdoteList;
