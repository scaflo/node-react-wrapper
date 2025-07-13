
# @scaflo/node-react-wrapper

A minimal and flexible Node.js + React SSR utility for rendering React components from a Node.js/Express backend with built-in TypeScript support.

## ✨ Features

- ⚛️ Simple React component rendering on the server
- 🧩 Supports TypeScript out of the box
- 🔒 Escapes HTML to prevent injection

## 📦 Installation

Using **npm**:

```bash
npm install @scaflo/node-react-wrapper
```

Using **pnpm**:

```bash
pnpm add @scaflo/node-react-wrapper
```

Using **yarn**:

```bash
yarn add @scaflo/node-react-wrapper
```

## 🚀 Usage

### Server-side rendering with Express (Basic)

```ts
import express from "express";
import { renderSSR } from "@scaflo/node-react-wrapper";
import App from "./App"; // Your React component

const app = express();

app.get("/", (_req, res) => {
  const html = renderSSR({
    App,
    title: "this trial SSR is working",
    cssPath: "/styles/index.css", // if using Tailwind, else import CSS directly in JSX
    jsPath: "/client.js",
  });

  res.send(html);
});

app.listen(3000, () => console.log("Server is running on http://localhost:3000"));
```

### React Component Example (`App.tsx`)

```tsx
import React from "react";

interface AppProps {
  message: string;
}

const App: React.FC<AppProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default App;
```

## 📂 Example Project

Check out the full working example here:
👉 [https://github.com/scaflo/express-react-ssr-trial](https://github.com/scaflo/express-react-ssr-trial)

## 📄 License

ISC © [Scaflo](https://github.com/scaflo)
