import { useSelector } from 'react-redux';
import Toggleable from './Toggleable';
import BlogForm from './BlogForm';
import MinBlog from './MinBlog';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
const BlogList = () => {
	const blogs = useSelector((state) => state.blogs);

	return (
		<div>
			<h2>Blog App</h2>
			<Toggleable>
				<BlogForm />
			</Toggleable>

			<Table>
				<TableBody>
					{blogs.map((blog) => (
						<TableRow key={blog.id}>
							<TableCell>
								<MinBlog blog={blog} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default BlogList;
