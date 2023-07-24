import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { addComment } from '../reducers/commentReducer';
import { Button, TextField } from '@mui/material';
const CommentForm = ({ id }) => {
	const comment = useField('text');
	const dispatch = useDispatch();

	const handleComment = (event) => {
		event.preventDefault();
		dispatch(addComment(id, { text: comment.value }));
	};

	return (
		<form onSubmit={handleComment}>
			<TextField label="Add a comment" {...comment} />
			<Button>add comment</Button>
		</form>
	);
};

export default CommentForm;
