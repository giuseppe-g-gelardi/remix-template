import { useTestContext } from "context/TestContext";

export default function Index() {
  const { hello } = useTestContext()

  return <h1 className="text-purple-300">Hello, {hello}!</h1>
}
