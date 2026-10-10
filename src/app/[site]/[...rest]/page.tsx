import { notFound } from "next/navigation";

// Any path no page matches. It sits outside every loading.tsx boundary so the
// response is a real 404, not a streamed 200.
export default function CatchAll() {
  notFound();
}
