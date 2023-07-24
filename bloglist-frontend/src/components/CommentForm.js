import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { addComment } from '../reducers/commentReducer';

const CommentForm = ({ id }) => {
	const comment = useField('text');
	const dispatch = useDispatch();

	const handleComment = (event) => {
		event.preventDefault();
		dispatch(addComment(id, { text: comment.value }));
	};

	return (
		<form onSubmit={handleComment}>
			<input {...comment} />
			<button>add comment</button>
		</form>
	);
};

export default CommentForm;
