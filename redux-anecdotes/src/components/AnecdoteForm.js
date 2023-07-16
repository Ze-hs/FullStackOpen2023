import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnec = (event) => {
		event.preventDefault();
		const newAnec = event.target.anec.value;
		event.target.anec.value = "";
		dispatch(addAnecdote(newAnec));
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
