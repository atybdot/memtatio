import UnderConstruction from "@/components/under-construction";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/data-sets/")({
  component: RouteComponent,
});

function RouteComponent() {
  return UnderConstruction
}
