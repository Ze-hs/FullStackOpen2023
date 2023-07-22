import { useDispatch } from 'react-redux';
import { logOut } from '../reducers/userReducer';

const Logout = () => {
	const dispatch = useDispatch();
	const handleLogOut = () => {
		dispatch(logOut());
	};
	return <button onClick={handleLogOut}>log out</button>;
};

export default Logout;
