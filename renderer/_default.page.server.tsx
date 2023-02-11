import renderPreact from "preact-render-to-string";
import { ServerStyleSheet } from "styled-components";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr";
import { version } from "../siteInfo";
import type { PageContextCustom } from "./_default.page.client";

export const render = async (pageContext: PageContextCustom) => {
  const { Page, pageProps } = pageContext;
  const sheet = new ServerStyleSheet();
  const viewHtml = renderPreact(sheet.collectStyles(<Page {...pageProps} />));

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="application-name" content="Ada Con 2023" />
        <title>
          Ada Con 2023 in Oslo
        </title>
        <meta
          name="description"
          content="Ada Lovelace Day Conference is a yearly conference which celebrates Norwegian women and non-binary people in Tech."
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/bootstrap.min.css"
        />
        <link rel="stylesheet" type="text/css" href="/static/base.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&Overpass+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="version" content="${version}" />
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(viewHtml)}</div>
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </body>
    </html>
    `;
};

export const passToClient = ["pageProps"];
