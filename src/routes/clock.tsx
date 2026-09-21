import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/clock")({
  component: () => <Navigate to="/" />,
});
