// import React, { ComponentType } from "react";
// import { renderToString } from "react-dom/server";

// function escapeHTML(str: string): string {
//   return str
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }

// interface SSRRendererOptions<P> {
//   Component: ComponentType<P>;
//   title?: string;
//   cssPath?: string;
//   jsPath?: string | null; // can be null to disable hydration
//   props?: P;
//   injectProps?: boolean; // whether to add window.__INITIAL_PROPS__
// }

// export function renderSSR<P>({
//   Component,
//   title = "SSR + Hydration",
//   cssPath,
//   jsPath = "/client.js",
//   props,
//   injectProps = true,
// }: SSRRendererOptions<P>): string {
//   const reactHtml = renderToString(<Component {...(props || ({} as P))} />);
//   const cssTag = cssPath ? `<link rel="stylesheet" href="${cssPath}" />` : "";

//   const serializedProps =
//     injectProps && jsPath
//       ? `<script>window.__INITIAL_PROPS__ = ${JSON.stringify(props ?? {})}</script>`
//       : "";

//   const jsScript =
//     jsPath && jsPath.trim() !== ""
//       ? `<script type="module" src="${jsPath}"></script>`
//       : "";

//   return `<!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="UTF-8" />
//     <title>${escapeHTML(title)}</title>
//     ${cssTag}
//   </head>
//   <body>
//     <div id="root">${reactHtml}</div>
//     ${serializedProps}
//     ${jsScript}
//   </body>
// </html>`;
// }

// ssrRenderer.ts
import React from "react";
import { renderToString } from "react-dom/server";

interface SSRRendererOptions {
  App: React.FC<any>;
  title?: string;
  cssPath?: string;
  jsPath?: string;
  props?: Record<string, any>;
}

export function renderSSR({
  App,
  title = "SSR + Hydration",
  cssPath,
  jsPath = "/client.js",
  props = {},
}: SSRRendererOptions): string {
  const reactHtml = renderToString(React.createElement(App, props));

  const cssTag = cssPath ? `<link rel="stylesheet" href="${cssPath}" />` : "";

  const jsScript =
    jsPath && jsPath.trim() !== ""
      ? `<script type="module" src="${jsPath}"></script>`
      : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        ${cssTag}
      </head>
      <body>
        <div id="root">${reactHtml}</div>
        ${jsScript}
      </body>
    </html>
  `;
}
