import { useDispatch } from 'react-redux';
import { logOut } from '../reducers/userAuthReducer';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogOut = () => {
		dispatch(logOut());
		navigate('/');
	};
	return <button onClick={handleLogOut}>log out</button>;
};

export default Logout;
