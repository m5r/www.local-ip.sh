import { useEffect } from "react";
import { useLocation } from "@remix-run/react";
import * as Fathom from "fathom-client";

export default function useFathom() {
	const location = useLocation();

	useEffect(() => {
		Fathom.load(window.siteConfig.fathom.siteId, {
			spa: "history",
			includedDomains: ["local-ip.sh"],
		});
	}, []);

	useEffect(() => {
		Fathom.trackPageview();
	}, [location]);
}
