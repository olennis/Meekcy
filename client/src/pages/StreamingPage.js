import React from 'react';

import { useHistory } from 'react-router-dom';

const StreamingPage = () => {
	const history = useHistory();
	const goToBack = () => {
		history.push(`/`);
	};
	return (
		<>
			<button
				onClick={() => {
					goToBack();
				}}
			></button>
		</>
	);
};

export default StreamingPage;
