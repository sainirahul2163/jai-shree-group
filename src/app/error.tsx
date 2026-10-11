"use client";

import { ErrorView } from "@/components/status/ErrorView";

export default function Error(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorView {...props} />;
}
