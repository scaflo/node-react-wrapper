// import React from "react";
// import { renderToString } from "react-dom/server";

// interface SSRRendererOptions {
//   App: React.FC<any>;
//   title?: string;
//   cssPath?: string;
//   jsPath?: string;
//   props?: Record<string, any>;
// }

// export function renderSSR({
//   App,
//   title = "SSR + Hydration",
//   cssPath,
//   jsPath = "/client.js",
//   props = {},
// }: SSRRendererOptions): string {
//   const reactHtml = renderToString(React.createElement(App, props));

//   const cssTag = cssPath ? `<link rel="stylesheet" href="${cssPath}" />` : "";

//   const jsScript =
//     jsPath && jsPath.trim() !== ""
//       ? `<script type="module" src="${jsPath}"></script>`
//       : "";

//   return `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <meta charset="UTF-8" />
//         <title>${title}</title>
//         ${cssTag}
//       </head>
//       <body>
//         <div id="root">${reactHtml}</div>
//         ${jsScript}
//       </body>
//     </html>
//   `;
// }



import  { ComponentType, createElement } from "react";
import { renderToString } from "react-dom/server";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface SSRRendererOptions<P extends object = {}> {
  App: ComponentType<P>;
  title?: string;
  cssPath?: string;
  jsPath?: string;
  props?: P;
}

export function renderSSR<P extends object = {}>({
  App,
  title = "SSR + Hydration",
  cssPath,
  jsPath = "/client.js",
  props,
}: SSRRendererOptions<P>): string {
  const reactHtml = renderToString(createElement(App, props ?? ({} as P)));

  const escapedTitle = escapeHtml(title);
  const cssTag = cssPath ? `<link rel="stylesheet" href="${cssPath}" />` : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${escapedTitle}</title>
        ${cssTag}
      </head>
      <body>
        <div id="root">${reactHtml}</div>
        <script type="module" src="${jsPath}"></script>
      </body>
    </html>
  `;
}
