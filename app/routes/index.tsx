// theirs
import { useLoaderData } from "@remix-run/react";
import { json } from '@remix-run/node'
import type { LoaderFunction } from "@remix-run/node";

// ours
import { useTestContext } from "context/TestContext";
import { serverClient } from "util/serverClient";

type TestLoaderData = {
  test: {
    id: number;
    created_at: string;
    message: string;
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const supabaseServer = serverClient({ request })
  const { data: test, error } = await supabaseServer.from("test").select("*").single();
  if (error) throw error;

  return json({ test });
}

export default function Index() {
  const { hello } = useTestContext()
  const { test } = useLoaderData<TestLoaderData>()

  return (
    <div>
      <h1 className="text-purple-300">Hello, {hello}!</h1>
      <p className="text-purple-300">Test: {JSON.stringify(test.message)}</p>
    </div>
  )
}
