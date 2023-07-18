import { useMutation, useQueryClient } from "react-query";
import anecdoteService from "../services/anecdote";
import { useNotifDispatch } from "../Context";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotifDispatch();

	const newAnecMutation = useMutation(anecdoteService.create, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData("anecdotes");

			dispatch({ type: "SET_NOTIF", payload: newAnecdote.content });
			setTimeout(() => {
				dispatch({ type: "CLEAR_NOTIF" });
			}, 5000);

			queryClient.setQueryData(
				"anecdotes",
				anecdotes.concat(newAnecdote)
			);
		},
		onError: () => {
			dispatch({
				type: "SET_NOTIF",
				payload: "Content too short, must be at leat 5 characters",
			});
			setTimeout(() => {
				dispatch({ type: "CLEAR_NOTIF" });
			}, 5000);
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		newAnecMutation.mutate({ content, votes: 0 });
		console.log("new anecdote");
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
