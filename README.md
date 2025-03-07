# Server Rendering with Express and React 19

This demo presents a simple server-side rendering (SSR) setup using Express, React 19, React Router DOM v6, and Webpack 5.

I transformed my [client-rendered React app template](https://github.com/ivstudio/react-typescript-tailwindcss-webpack5-starter) into a server-rendered version using React Router DOM v6 with Data Router and ExpressJS. This isn't a production-ready project, but rather an exploration to deepen my understanding of SSR without relying on a framework. If you're looking to server-render your React app, I recommend using [Remix](https://remix.run/) or [Next.js](https://nextjs.org/).


<a href="https://twitter.com/ivstudio"><img src="https://img.shields.io/twitter/follow/ivstudio.svg?style=social&label=Follow&maxAge=3600" height="20"></a>

## Tech Stack

- [Express](https://expressjs.com/)
- [React 19](https://reactjs.org/)
- [React Router DOM v6](https://reactrouter.com/en/main)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Webpack 5](https://webpack.js.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) 

## Key Features

This project includes several key features and configurations:

- **Server-Side Rendering:** Set up [SSR using ExpressJS](https://github.com/ivstudio/ssr-express-react/blob/main/src/server/entry.server.ts) to generate fully [rendered HTML](https://github.com/ivstudio/ssr-express-react/blob/main/src/server/render.tsx) pages on the server.
- **React Router DOM v6:** Using [Data Router](https://reactrouter.com/en/main/guides/ssr) and [Lazy loading](https://github.com/ivstudio/ssr-express-react/blob/main/src/pages/About/About.tsx) for optimized code-splitting across routes.
- **Data Preloading:** Leveraged the [Loader](https://github.com/ivstudio/ssr-express-react/blob/main/src/routes.tsx) function to pre-load data.
- **Access pre-loaded data with Hooks:** Utilized the [useLoaderData](https://github.com/ivstudio/ssr-express-react/blob/main/src/pages/BlogRoll/BlogRoll.tsx) hook to access preloaded data within components.
- **Nested Routes:** Managed nested UI with [Outlet](https://github.com/ivstudio/ssr-express-react/blob/main/src/routes.tsx).
- **Webpack Configuration:**  [target Node](https://github.com/ivstudio/ssr-express-react/blob/main/webpack/webpack.server.ts) in Webpack 5 for server-side usage.

### Requirements

- Before starting, ensure you have [Node.js](https://nodejs.org/) v22.x or later and npm installed.

## Getting Started

1. Clone project
2. `npm install`
3. `npm run dev`


## SSR Flow with ExpressJS and React

In Server-side Rendering(SSR), the server generates the HTML and sends a fully rendered page to the browser. This allows users to view content immediately, without waiting for JavaScript to load, improving initial page load time and enabling search engine crawlers to easily access and index the content. Once in the browser, React hydrates the HTML by attaching event handlers, making the page fully interactive.


**SSR Flow:**

- **InitialRequest:** The browser sends an HTTP request to the server for the web page.
- **Server Processing:**  The [server](https://github.com/ivstudio/ssr-express-react/blob/main/src/server/entry.server.ts), in our case ExpressJS receives and incoming request.
- **Data Fetching**: React Router v6 triggers any data-loading functions associated with the matched route to fetch the necessary data on the server.
- **Component Rendering**: React 19 renders the React components for the matched route on the server, using the fetched data to generate the complete HTML.
- **HTML Response**: The fully rendered HTML, along with the fetched data embedded as JSON, is [sent back to the browser](https://github.com/ivstudio/ssr-express-react/blob/main/src/server/render.tsx) by the Express server.
- **Initial Content Display**: The browser displays the fully rendered HTML immediately, providing users with visible content without waiting for JavaScript.
- **JavaScript and Hydration**: The browser downloads the JavaScript bundle. [React 19 then hydrates](https://github.com/ivstudio/ssr-express-react/blob/main/src/entry.client.tsx) the page, attaching event handlers and enabling full interactivity on the client side.
- **Client-Side Navigation**: Subsequent navigation within the app is handled by React Router on the client side, without full page reloads, maintaining a seamless user experience.

### View page source

When you inspect the page source in the dev console, the HTML is visible and can be crawled by search engines, ensuring your content is indexable.

![SSR Code](https://ivstudio.s3.amazonaws.com/app/blog/ssr-code.webp)

![SSR Blog Image](https://ivstudio.s3.amazonaws.com/app/blog/ssr-blog.webp)

---

<p align="center"><sup>Made with ♥ by <a href="https://ivstudio.com">ivstudio</a></sup></p>