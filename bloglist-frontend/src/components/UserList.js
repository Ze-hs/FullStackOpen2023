import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const UserList = () => {
	const userList = useSelector((state) => state.users);

	return (
		<>
			<h2>Users</h2>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>blogs created</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{userList.map((user) => (
						<TableRow key={user.id}>
							<TableCell>
								<Link to={`/users/${user.id}`}>
									{user.name}
								</Link>
							</TableCell>
							<TableCell>{user.blogs.length}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default UserList;
