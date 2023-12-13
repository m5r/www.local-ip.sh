import { cssBundleHref } from "@remix-run/css-bundle";
import { json, type SerializeFrom, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import useFathom from "./hooks/use-fathom";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
