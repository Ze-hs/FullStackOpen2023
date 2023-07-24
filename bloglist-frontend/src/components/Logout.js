import { useDispatch } from 'react-redux';
import { logOut } from '../reducers/userAuthReducer';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogOut = () => {
		dispatch(logOut());
		navigate('/');
	};
	return (
		<Button color="inherit" onClick={handleLogOut}>
			log out
		</Button>
	);
};

export default Logout;
