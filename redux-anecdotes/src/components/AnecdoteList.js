import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const dispatch = useDispatch();

	const anecdotes = useSelector(({ anecdotes, filter }) => {
		const newlist = anecdotes.filter(({ content }) =>
			content.includes(filter)
		);
		return newlist.sort((a, b) => b - a);
	});

	const vote = (id, content) => {
		dispatch(addVote(id));
		dispatch(setNotification(`You added '${content}'`, 5));
	};

	return (
		<>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button
							onClick={() => vote(anecdote.id, anecdote.content)}
						>
							vote
						</button>
					</div>
				</div>
			))}
		</>
	);
};

export default AnecdoteList;
