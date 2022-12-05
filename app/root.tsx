// theirs
import type { MetaFunction, LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";

// ours
import { TestProvider } from "context/TestContext";
import styles from './tailwind.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async () => {
  return {
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
      DATABASE_KEY: process.env.DATABASE_KEY
    }
  }
};

export default function App() {
  const { env } = useLoaderData()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <TestProvider>
          <Outlet />
        </TestProvider>
        <ScrollRestoration />
        <DangerouslySetInnerHTML env={env} />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// DangerouslySetInnerHTML is a component that sets the window.env variable
// to the env object passed in. This is so that we can access the env variables
// in the client side code.
function DangerouslySetInnerHTML({ env }: { env: Record<string, string> }) {
  return <script dangerouslySetInnerHTML={{
    __html: `window.env = ${JSON.stringify(env)}`
  }} />
}
