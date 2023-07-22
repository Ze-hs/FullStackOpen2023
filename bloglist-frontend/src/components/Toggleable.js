import { useState } from 'react';

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
				<button onClick={() => toggleVisible()}> Add new blog</button>
			</div>

			<div style={showWhenVisible}>
				{children}
				<button onClick={() => toggleVisible()}>Cancel</button>
			</div>
		</>
	);
};

export default Toggleable;
