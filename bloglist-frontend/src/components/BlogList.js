import { useSelector } from 'react-redux';
import Toggleable from './Toggleable';
import BlogForm from './BlogForm';
import MinBlog from './MinBlog';

const BlogList = () => {
	const blogs = useSelector((state) => state.blogs);

	return (
		<div>
			<h2>Blog App</h2>
			<Toggleable>
				<BlogForm />
			</Toggleable>

			{blogs.map((blog) => (
				<MinBlog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default BlogList;
