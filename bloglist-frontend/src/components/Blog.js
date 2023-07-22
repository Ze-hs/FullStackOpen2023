import { useState } from 'react';
import Proptypes from 'prop-types';
import { handleDelete, handleLikes } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';

const Blog = ({ blog }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const [detailsVisible, setDetailsVisible] = useState(false);
	const toggleDetails = () => {
		setDetailsVisible(!detailsVisible);
	};

	const hideWhenVisible = { display: detailsVisible ? 'none' : '' };
	const showWhenVisible = { display: detailsVisible ? '' : 'none' };

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	};

	const addLikes = () => {
		const newBlog = {
			title: blog.title,
			url: blog.url,
			author: blog.author,
			likes: blog.likes + 1
		};

		dispatch(handleLikes(blog.id, newBlog));
	};

	const removeBlog = () => {
		if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
			dispatch(handleDelete(blog.id));
		}
	};

	return (
		<div className={'blog'} style={blogStyle}>
			<div style={hideWhenVisible} className={'whenHidden'}>
				<p>
					{`${blog.title} ${blog.author}`}
					<button onClick={() => toggleDetails()}>view</button>
				</p>
			</div>

			<div style={showWhenVisible} className={'whenVisible'}>
				<p id="blog-title">
					{blog.title} {blog.author}
					<button
						className={'detailsBtn'}
						onClick={() => toggleDetails()}
					>
						view
					</button>
				</p>

				<p className={'url'}>{blog.url}</p>
				<p className={'likesCounter'}>
					likes {blog.likes}
					<button onClick={addLikes}>like</button>
				</p>
				<p>{blog.user.name}</p>
				{blog.user.username === user.username && (
					<button onClick={removeBlog}>Delete</button>
				)}
			</div>
		</div>
	);
};

Blog.propTypes = {
	blog: Proptypes.object.isRequired
};

export default Blog;
