import { Link } from 'react-router-dom';

const MinBlog = ({ blog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	};
	return (
		<Link
			style={blogStyle}
			to={`blog/${blog.id}`}
		>{`${blog.title} ${blog.author}`}</Link>
	);
};

export default MinBlog;
