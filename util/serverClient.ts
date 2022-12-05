import { createServerClient } from "@supabase/auth-helpers-remix";
import { supabaseUrl, supabaseKey } from "./supabase";

// The serverClient function is used to create a Supabase client that can 
// be used in the server

// this export massively simplifies the code in the loaders and actions
// as well as making it significantly easier to understand

export const serverClient = ({ request }: { request: Request }) => {
  const response = new Response();
  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    { request, response }
  );
  return supabase;
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/* example usage in an API route

  const loader: LoaderFunction = async ({ request }) => {
    const supabaseServer = serverClient({ request })
    const { data: test, error } = await supabaseServer.from("test").select("*").single();
    if (error)  throw error;

  return { test };
}

 */
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/* previous version of the serverClient function looks like this

import { json } from '@remix-run/node' // change this import to whatever runtime you are using
import { createServerClient } from '@supabase/auth-helpers-remix'

export const loader = async ({ request }) => {
  const response = new Response()

  const supabaseClient = createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { request, response }
  )

  const { data } = await supabaseClient.from('test').select('*')

  return json(
    { data },
    {
      headers: response.headers,
    }
  )
}
*/
