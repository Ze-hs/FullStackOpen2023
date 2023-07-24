import { handleDelete, handleLikes } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import CommentList from './CommentList';
import { Button } from '@mui/material';
const Blog = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userAuth);
	const blogs = useSelector((state) => state.blogs);
	const id = useParams().id;

	const blog = blogs.find((blog) => blog.id === id);

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
			navigate('/');
		}
	};

	if (!blog) {
		return null;
	}

	return (
		<div>
			<h2 id="blog-title">
				{blog.title} {blog.author}
			</h2>

			<p className={'url'}>{blog.url}</p>
			<p className={'likesCounter'}>
				likes {blog.likes}
				<Button onClick={addLikes}>like</Button>
			</p>
			<p>{blog.user.name}</p>
			{blog.user.username === user.username && (
				<Button onClick={removeBlog}>Delete</Button>
			)}

			<CommentList />
		</div>
	);
};

export default Blog;
