import { cssBundleHref } from "@remix-run/css-bundle";
import { json, type SerializeFrom, type LinksFunction, type MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";

import useFathom from "./hooks/use-fathom";

export const meta: MetaFunction = () => [
	{ name: "title", content: "local-ip.sh" },
	{
		name: "description",
		content: "local-ip.sh is a magic domain name that provides wildcard DNS for any IP address.",
	},
	{ name: "author", content: "Mokhtar Mial" },
	{ name: "robots", content: "index,follow" },
	{ name: "googlebot", content: "index,follow" },
	{ property: "twitter:title", content: "local-ip.sh" },
	{
		property: "twitter:description",
		content: "local-ip.sh is a magic domain name that provides wildcard DNS for any IP address.",
	},
	{ property: "twitter:card", content: "summary_large_image" },
	{ property: "twitter:site", content: "https://local-ip.sh/" },
	{ property: "twitter:image", content: "https://local-ip.sh/og.png" },
	{ property: "twitter:image:alt", content: "og image" },
	{ property: "og:title", content: "local-ip.sh" },
	{
		property: "og:description",
		content: "local-ip.sh is a magic domain name that provides wildcard DNS for any IP address.",
	},
	{ property: "og:url", content: "https://local-ip.sh/" },
	{ property: "og:type", content: "website" },
	{ property: "og:image", content: "https://local-ip.sh/og.png" },
	{ property: "og:image:alt", content: "og image" },
];

export const links: LinksFunction = () => [...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [])];

export const loader = () =>
	json({
		siteConfig: {
			fathom: {
				siteId: process.env.FATHOM_SITE_ID!,
				domain: process.env.FATHOM_CUSTOM_DOMAIN!,
			},
		},
	});

declare global {
	interface Window {
		siteConfig: SerializeFrom<typeof loader>["siteConfig"];
	}
}

export default function App() {
	const { siteConfig } = useLoaderData<typeof loader>();
	useFathom();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<script
					suppressHydrationWarning
					dangerouslySetInnerHTML={{
						__html: `window.siteConfig=${JSON.stringify(siteConfig)};`,
					}}
				/>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
