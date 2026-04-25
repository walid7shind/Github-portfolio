"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-87XXFEKMWL";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!window.gtag) return;

    const query = window.location.search;
    const url = query ? `${pathname}${query}` : pathname;

    window.gtag("event", "page_view", {
      page_path: url,
    });
  }, [pathname]);

  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
// Disable automatic page_view; we send it on route changes.
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
`}
      </Script>
    </>
  );
}
