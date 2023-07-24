import { Link } from 'react-router-dom';

const MinBlog = ({ blog }) => {
	return <Link to={`blog/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link>;
};

export default MinBlog;
