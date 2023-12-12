export async function loader() {
	if (process.env.NODE_ENV === "development") {
		// return fetch("http://localhost:9229/server.pem");
	}

	return fetch("http://local-ip.internal:9229/server.pem");
}
