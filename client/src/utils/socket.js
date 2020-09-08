import io from 'socket.io-client';
//import io from 'socketio-jwt';

// const token = localStorage.getItem('token');

// const socket = io.connect('http://localhost:4000', {
// 	query: 'token=' + token,
// });

// socket.on('connect', {
// 	extraHeaders: { Authorization: `Bearer ${token}` },
// });
let socket;
export function connectSocket() {
	const token = localStorage.getItem('token');

	socket = io.connect('http://localhost:4000', {
		query: 'token=' + token,
	});
}
export default socket;
