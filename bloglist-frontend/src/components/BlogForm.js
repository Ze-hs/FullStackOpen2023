import { useState } from 'react';
// import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';
import { createBlogs } from '../reducers/blogReducer';

import { useDispatch, useSelector } from 'react-redux';

const BlogForm = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleCreate = async (event) => {
		const blog = {
			title,
			author,
			url
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
			<label>title</label>
			<input
				id={'title'}
				value={title}
				onChange={({ target }) => setTitle(target.value)}
			/>
			<br />
			<label>author</label>
			<input
				id={'author'}
				value={author}
				onChange={({ target }) => setAuthor(target.value)}
			/>
			<br />
			<label>url</label>
			<input
				id={'url'}
				value={url}
				onChange={({ target }) => setUrl(target.value)}
			/>
			<br />
			<button id={'create'}>create</button>
		</form>
	);
};

export default BlogForm;
