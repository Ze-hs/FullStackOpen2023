import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import anecdoteService from "./services/anecdote";
import { useNotifDispatch } from "./Context";

const App = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotifDispatch();

	const updateAnecMutation = useMutation(anecdoteService.update, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData("anecdotes");
			dispatch({
				type: "SET_NOTIF",
				payload: `You voted ${newAnecdote.content}`,
			});
			setTimeout(() => {
				dispatch({ type: "CLEAR_NOTIF" });
			}, 5000);

			queryClient.setQueryData(
				"anecdotes",
				anecdotes.map((elem) =>
					elem.id === newAnecdote.id ? newAnecdote : elem
				)
			);
		},
	});

	const handleVote = (anecdote) => {
		updateAnecMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
	};

	const result = useQuery("anecdotes", anecdoteService.getAll, {
		retry: false,
	});

	if (result.isLoading) {
		return <div>Loading .... </div>;
	} else if (result.isError) {
		return <div> Anecdote service not available due to server errors </div>;
	}

	return (
		<div>
			<h3>Anecdote app</h3>
			<Notification />
			<AnecdoteForm />

			{result.data.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
