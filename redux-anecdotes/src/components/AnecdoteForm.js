import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnec = async (event) => {
		event.preventDefault();
		const value = event.target.anec.value;
		event.target.anec.value = "";

		dispatch(addAnecdote(value));
		dispatch(setNotification(`You added '${value}'`, 5));
	};

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={addAnec}>
				<div>
					<input name="anec" />
				</div>
				<button>create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;
