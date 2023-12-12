import type { LinksFunction, MetaFunction } from "@remix-run/node";

import styles from "../styles/index.css";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
];

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<>
			<header>
				<pre>
{`        _                 _       _            _     
       | |               | |     (_)          | |    
       | | ___   ___ __ _| |      _ _ __   ___| |__  
       | |/ _ \\ / __/ _\` | |_____| | '_ \\ / __| '_ \\ 
       | | (_) | (_| (_| | |_____| | |_) |\\__ \\ | | |
       |_|\\___/ \\___\\__,_|_|     |_| .__(_)___/_| |_|
                                   | |               
                                   |_|
`}
				</pre>
			</header>

			<main>
				<section>
					<header><strong>What is local-ip.sh?</strong></header>
					<main>
						<article>
							local-ip.sh is a magic domain name that provides wildcard DNS
							for any IP address. It is heavily inspired by <a href="http://local-ip.co">local-ip.co</a>,
							{" "}<a href="https://sslip.io">sslip.io</a>, and <a href="https://xip.io">xip.io</a>.
						</article>

						<article>
							Quick example, say your LAN IP address is <strong>192.168.1.10</strong>.
							Using local-ip.sh,

							<br /><br />

							<pre dangerouslySetInnerHTML={{
								__html: `       <strong>192.168.1.10</strong>.local-ip.sh resolves to 192.168.1.10
  dots.<strong>192.168.1.10</strong>.local-ip.sh resolves to 192.168.1.10
dashes.<strong>192-168-1-10</strong>.local-ip.sh resolves to 192.168.1.10`,
							}} />
						</article>

						<article>
							...and so on. You can use these domains to access virtual
							hosts on your development web server from devices on your
							local network. No configuration required!
						</article>

						<article>
							The best part is, you can serve your content over HTTPS with our TLS certificate
							for <code>*.local-ip.sh</code>:
							<ul>
								<li><a href="/server.pem">server.pem</a></li>
								<li><a href="/server.key">server.key</a></li>
							</ul>
							Be aware that wildcard certificates are not recursive, meaning they don't match "sub-subdomains". <br />
							In our case, this certificate will only match subdomains of <code>local-ip.sh</code> such as <code>192-168-1-10.local-ip.sh</code>
							{" "}where dashes separate the numbers that make up the IP address.
						</article>
					</main>
				</section>

				<section>
					<header><strong>How does it work?</strong></header>
					<main>
						<article>
							local-ip.sh runs publicly a <a href="https://github.com/m5r/local-ip.sh">custom DNS server</a>.
							When your computer looks up a local-ip.sh domain, the local-ip.sh
							DNS server resolves to the IP address it extracts from the domain.
						</article>

						<article>
							The TLS certificate is obtained from Let's Encrypt and renewed up to a month before it expires.
						</article>
					</main>
				</section>
			</main>

			<footer className="copyright">
				© {new Date().getFullYear()} <a href="https://www.mokhtar.dev">Mokhtar Mial</a>
			</footer>
		</>
	);
}
