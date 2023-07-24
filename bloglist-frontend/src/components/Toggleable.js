import { useState } from 'react';
import { Button } from '@mui/material';
const Toggleable = ({ children }) => {
	const [formVisible, setFormVisible] = useState(false);

	const hideWhenVisible = { display: formVisible ? 'none' : '' };
	const showWhenVisible = { display: formVisible ? '' : 'none' };

	const toggleVisible = () => {
		setFormVisible(!formVisible);
	};
	return (
		<>
			<div style={hideWhenVisible}>
				<Button onClick={() => toggleVisible()}> Add new blog</Button>
			</div>

			<div style={showWhenVisible}>
				{children}
				<Button onClick={() => toggleVisible()}>Cancel</Button>
			</div>
		</>
	);
};

export default Toggleable;
