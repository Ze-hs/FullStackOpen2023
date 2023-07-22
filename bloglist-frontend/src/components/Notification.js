import { useSelector } from 'react-redux';

const Notification = () => {
	const message = useSelector((state) => state.notification);

	if (message === null) {
		return null;
	}

	return <h2 className={'error'}>{message}</h2>;
};

export default Notification;
