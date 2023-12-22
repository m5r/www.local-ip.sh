export async function loader() {
	return fetch("http://local-ip.internal:9229/server.pem");
}
