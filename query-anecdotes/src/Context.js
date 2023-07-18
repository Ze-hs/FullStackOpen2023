import { createContext, useReducer, useContext } from "react";

const Context = createContext();

const notifReducer = (state, action) => {
	switch (action.type) {
		case "SET_NOTIF":
			return action.payload;
		case "CLEAR_NOTIF":
			return null;
		default:
			return state;
	}
};

export const ContextProvider = (props) => {
	const [notfication, setNotification] = useReducer(notifReducer, null);

	return (
		<Context.Provider value={[notfication, setNotification]}>
			{props.children}
		</Context.Provider>
	);
};

export const useNotifValue = () => {
	const notifAndDispatch = useContext(Context);
	return notifAndDispatch[0];
};

export const useNotifDispatch = () => {
	const notifAndDispatch = useContext(Context);
	return notifAndDispatch[1];
};

export default Context;
