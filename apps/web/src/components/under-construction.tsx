import { ConstructionIcon } from "lucide-react";

import { buttonVariants } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

function UnderConstruction() {
  return (
    <section className="relative grid h-full w-full grid-flow-row place-content-center gap-y-4 overflow-hidden capitalize">
      <ConstructionIcon className="m-auto size-12 text-amber-500" />
      <p className="font-b text-4xl">under construction</p>
      <Link
        to={"/"}
        className={cn(
          buttonVariants({}),
          "m-auto w-fit font-sans text-xl capitalize"
        )}
      >
        Go Home
      </Link>
    </section>
  );
}

export default UnderConstruction;
