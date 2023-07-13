import { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ setBlogs, blogs, setMessage, user }) => {
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
			const response = await blogService.create(blog);
			setBlogs(blogs.concat({ ...response, user }));
			setTitle('');
			setAuthor('');
			setUrl('');
		} catch (error) {
			setMessage(error);
			setTimeout(() => {
				setMessage(null);
			}, 5000);
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
