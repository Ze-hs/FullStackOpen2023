import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initializeComments } from '../reducers/commentReducer';
import { useEffect } from 'react';
import CommentForm from './CommentForm';
import { List, ListItem } from '@mui/material';
const CommentList = () => {
	const id = useParams().id;
	const dispatch = useDispatch();
	const comments = useSelector((state) => state.comments);

	useEffect(() => {
		dispatch(initializeComments(id));
	}, []);

	if (!comments) {
		return false;
	}

	return (
		<>
			<h3>Comment</h3>
			<CommentForm id={id} />

			<List>
				{comments.map((comment) => (
					<ListItem key={comment.id}>{comment.text}</ListItem>
				))}
			</List>
		</>
	);
};

export default CommentList;
