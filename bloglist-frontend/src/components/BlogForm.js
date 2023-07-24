import { setNotification } from '../reducers/notificationReducer';
import { createBlogs } from '../reducers/blogReducer';
import { useField } from '../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@mui/material';
const BlogForm = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userAuth);

	const title = useField('text');
	const author = useField('text');
	const url = useField('text');

	const handleCreate = async (event) => {
		const blog = {
			title: title.value,
			author: author.value,
			url: url.value
		};

		event.preventDefault();

		try {
			dispatch(createBlogs(blog, user));
		} catch (error) {
			dispatch(setNotification(error));
		}
	};

	return (
		<form onSubmit={handleCreate}>
			<TextField label="Title" {...title} />
			<br />
			<TextField label="Author" {...author} />
			<br />
			<TextField label="Url" {...url} />
			<br />
			<Button type="submit" id={'create'}>
				create
			</Button>
		</form>
	);
};

export default BlogForm;
